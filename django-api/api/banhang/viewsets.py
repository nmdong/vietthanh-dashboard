from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
# from .models import AAddskhach, FAadanhSachHD, AAddsquatang, Abdsnhanvien, Aadsvitri, AAcdshuyen, AAcdsxa, AAbdstinhthanh
# from .serializers import AAddskhachSerializer, FAadahnSachHDSerializer, AAddsquatangSerializer, AAbdsnhanvienSerializer, AadsvitriSerializer, HuyenSerializer, XaSerializer, AAbdstinhthanhSerializer, AAddskhachCreateSerializer
from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny
# from django.contrib.auth.hashers import make_password

class KhachHangDetailAPIView(APIView):
    def get(self, request, makhach):
        try:
            khach = AAddskhach.objects.get(Makhach=makhach)
            khach_data = AAddskhachSerializer(khach).data

            hd = FAadanhSachHD.objects.filter(Makhachhang=makhach)
            hd_data = FAadahnSachHDSerializer(hd, many=True).data

            monqua_ids = hd.values_list('Mamonqua', flat=True)
            qua_data = AAddsquatangSerializer(AAddsquatang.objects.filter(Mamonqua__in=monqua_ids), many=True).data

            return Response({
                'khachhang': khach_data,
                'hopdong': hd_data,
                'monqua': qua_data,
            })
        except AAddskhach.DoesNotExist:
            return Response({'error': 'Không tìm thấy khách hàng'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AANhanVienViewSet(viewsets.ModelViewSet):
    queryset = Abdsnhanvien.objects.all()
    serializer_class = AAbdsnhanvienSerializer
    permission_classes = [AllowAny]  # Bạn có thể đổi thành IsAuthenticated hoặc custom permission

    def create(self, request, *args, **kwargs):
        form_data = request.data.get('formData', {})
        if not form_data:
            return Response({"error": "formData không được gửi"}, status=status.HTTP_400_BAD_REQUEST)
        # Kiểm tra xem formData có chứa các trường cần thiết không
        # Tạo serializer với formData
        serializer = self.get_serializer(data=form_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Tùy ý xử lý token ở đây nếu cần

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class AadsvitriViewSet(viewsets.ModelViewSet):
    queryset = Aadsvitri.objects.all()
    serializer_class = AadsvitriSerializer

class TinhViewSet(viewsets.ModelViewSet):
    queryset = AAbdstinhthanh.objects.all()
    serializer_class = AAbdstinhthanhSerializer

class HuyenViewSet(viewsets.ModelViewSet):
    serializer_class = HuyenSerializer

    def get_queryset(self):
        queryset = AAcdshuyen.objects.all()
        matinh = self.request.query_params.get('matinh')
        if matinh:
            queryset = queryset.filter(Matinh__Matinh=matinh)
        return queryset

class XaViewSet(viewsets.ModelViewSet):
    serializer_class = XaSerializer

    def get_queryset(self):
        queryset = AAcdsxa.objects.all()
        mahuyen = self.request.query_params.get('mahuyen')
        if mahuyen:
            queryset = queryset.filter(Mahuyen__Mahuyen=mahuyen)
        return queryset
    
class AAddskhachViewSet(viewsets.ModelViewSet):
    queryset = AAddskhach.objects.all()
    serializer_class = AAddskhachCreateSerializer

    def create(self, request, *args, **kwargs):
        form_data = request.data.get('formData', None)

        if form_data is None:
            return Response({'error': 'Thiếu formData'}, status=status.HTTP_400_BAD_REQUEST)

        # Nếu muốn xử lý token, bạn có thể xác thực tại đây:
        # validate_token(token)  # <-- Tuỳ bạn xử lý

        # Serialize form_data
        serializer = self.get_serializer(data=form_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class AAddskhachViewSet(viewsets.ModelViewSet):
    queryset = AAddskhach.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return AAddskhachCreateSerializer
        return AAddskhachSerializer

    def create(self, request, *args, **kwargs):
        form_data = request.data.get('formData', None)

        if form_data is None:
            return Response({'error': 'Thiếu formData'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=form_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=False)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        form_data = request.data.get('formData', None)

        if form_data is None:
            return Response({'error': 'Thiếu formData'}, status=status.HTTP_400_BAD_REQUEST)
        data = form_data

        print("Data received for update:", data)

        # Xử lý hình ảnh từ hex -> binary nếu có
        hinhanh_hex = data.get('Hinhanh', '')
        hinhanh_binary = binascii.unhexlify(hinhanh_hex) if hinhanh_hex else instance.Hinhanh

        # LoaiID
        loai_id = data.get("LoaiID", None)
        loai_instance = Aadsvitri.objects.filter(pk=loai_id).first() if loai_id else None

        # Nhanvien
        nhanvien_id = data.get("Nhanvien", None)
        nhanvien_instance = Abdsnhanvien.objects.filter(pk=nhanvien_id).first() if nhanvien_id else None

        # Xử lý Xaphuong nested
        xa_data = data.get('Xaphuong', None)
        if xa_data:
            tinh_instance = AAbdstinhthanh.objects.get(Matinh=xa_data["tinh"])
            huyen_instance = AAcdshuyen.objects.get(
                Mahuyen=xa_data["huyen"],
                Matinh=tinh_instance
            )
            xaphuong_instance = AAcdsxa.objects.get(
                Maxa=xa_data["xa"],
                Mahuyen=huyen_instance
            )
        else:
            xaphuong_instance = instance.Xaphuong

        # Cập nhật instance
        instance.Tenkhach = data.get("Tenkhach", instance.Tenkhach)
        instance.Sodienthoai = data.get("Sodienthoai", instance.Sodienthoai)
        instance.Ngaytao = data.get("Ngaytao", instance.Ngaytao)
        instance.LoaiID = loai_instance
        instance.User = data.get("User", instance.User)
        instance.Pass = data.get("Pass", instance.Pass)
        instance.Danghi = data.get("Danghi", instance.Danghi)
        instance.Hinhanh = hinhanh_binary
        instance.Ngaysinhhat = data.get("Ngaysinhhat", instance.Ngaysinhhat)
        instance.Diachi = data.get("Diachi", instance.Diachi)
        instance.loaiDoiTac = data.get("loaiDoiTac", instance.loaiDoiTac)
        instance.Nhanvien = nhanvien_instance
        instance.Email = data.get("Email", instance.Email)
        instance.Sdtzalo = data.get("Sdtzalo", instance.Sdtzalo)
        instance.Nguoilienhe = data.get("Nguoilienhe", instance.Nguoilienhe)
        instance.Xaphuong = xaphuong_instance
        instance.Ksd = data.get("Ksd", instance.Ksd)

        instance.save()

        # Trả về 4 trường như to_representation
        return Response({
            "Makhach": instance.Makhach,
            "Tenkhach": instance.Tenkhach,
            "Sodienthoai": instance.Sodienthoai,
            "Ngaytao": instance.Ngaytao.isoformat()
        }, status=status.HTTP_200_OK)

    # def partial_update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=True)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        form_data = request.data.get('formData', None)

        if form_data is None:
            return Response({'error': 'Thiếu formData'}, status=status.HTTP_400_BAD_REQUEST)
        data = form_data

        print("Data received for update:", data)

        # Xử lý Hinhanh nếu có
        if 'Hinhanh' in data:
            hinhanh_hex = data.get('Hinhanh')
            instance.Hinhanh = binascii.unhexlify(hinhanh_hex) if hinhanh_hex else None

        # LoaiID nếu có
        if 'LoaiID' in data:
            loai_id = data.get('LoaiID')
            instance.LoaiID = Aadsvitri.objects.filter(pk=loai_id).first() if loai_id else None

        # Nhanvien nếu có
        if 'Nhanvien' in data:
            nhanvien_id = data.get('Nhanvien')
            instance.Nhanvien = Abdsnhanvien.objects.filter(pk=nhanvien_id).first() if nhanvien_id else None

        # Xử lý nested Xaphuong nếu có
        if 'Xaphuong' in data:
            xa_data = data.get('Xaphuong')
            try:
                tinh_instance = AAbdstinhthanh.objects.get(Matinh=xa_data["tinh"])
                huyen_instance = AAcdshuyen.objects.get(
                    Mahuyen=xa_data["huyen"],
                    Matinh=tinh_instance
                )
                xaphuong_instance = AAcdsxa.objects.get(
                    Maxa=xa_data["xa"],
                    Mahuyen=huyen_instance
                )
                instance.Xaphuong = xaphuong_instance
            except Exception as e:
                return Response({'error': f'Lỗi khi xử lý Xaphuong: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

        # Các field còn lại (chỉ cập nhật nếu có trong data)
        simple_fields = [
            'Tenkhach', 'Sodienthoai', 'Ngaytao', 'User', 'Pass', 'Danghi',
            'Ngaysinhhat', 'Diachi', 'loaiDoiTac', 'Email', 'Sdtzalo', 'Nguoilienhe', 'Ksd'
        ]
        for field in simple_fields:
            if field in data:
                setattr(instance, field, data[field])

        instance.save()

        # Trả về như create/update
        return Response({
            "Makhach": instance.Makhach,
            "Tenkhach": instance.Tenkhach,
            "Sodienthoai": instance.Sodienthoai,
            "Ngaytao": instance.Ngaytao.isoformat()
        }, status=status.HTTP_200_OK)


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"detail": "Đã xóa thành công."}, status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)