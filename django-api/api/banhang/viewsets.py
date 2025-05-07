from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import AAddskhach, FAadanhSachHD, AAddsquatang, Abdsnhanvien, Aadsvitri
from .serializers import AAddskhachSerializer, FAadahnSachHDSerializer, AAddsquatangSerializer, AAbdsnhanvienSerializer, AadsvitriSerializer
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