from rest_framework import serializers
from .models import *
import random
import string
import datetime
import binascii

class AAddskhachSerializer(serializers.ModelSerializer):
    class Meta:
        model = AAddskhach
        fields = '__all__'

class FAadahnSachHDSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAadanhSachHD
        fields = '__all__'

class AAddsquatangSerializer(serializers.ModelSerializer):
    class Meta:
        model = AAddsquatang
        fields = '__all__'

class CAanhomspSerializer(serializers.ModelSerializer):
    class Meta:
        model = CAanhomsp
        fields = '__all__'

class CAbdanhmucnhomSerializer(serializers.ModelSerializer):
    class Meta:
        model = CAbdanhmucnhom
        fields = '__all__'

class CADanhmucPLSerializer(serializers.ModelSerializer):
    class Meta:
        model = CADanhmucPL
        fields = '__all__'
        
class CACdanhmucspSerializer(serializers.ModelSerializer):
    class Meta:
        model = CACdanhmucsp
        fields = '__all__'

class AAbdsnhanvienSerializer(serializers.ModelSerializer):
    class Meta:
        model = Abdsnhanvien
        fields = '__all__'

class AadsvitriSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aadsvitri
        fields = '__all__'

class AAbdstinhthanhSerializer(serializers.ModelSerializer):
    class Meta:
        model = AAbdstinhthanh
        fields = ['Matinh', 'Tentinh']

class HuyenSerializer(serializers.ModelSerializer):
    class Meta:
        model = AAcdshuyen
        fields = ['Mahuyen', 'Tenhuyen']

class XaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AAcdsxa
        fields = ['Maxa', 'Tenxa']

class AAddskhachSerializer(serializers.ModelSerializer):
    class Meta:
        model = AAddskhach
        fields = "__all__"

class AAddskhachCreateSerializer(serializers.ModelSerializer):
    Xaphuong = serializers.DictField()

    class Meta:
        model = AAddskhach
        fields = [
            "Makhach", "Tenkhach", "Sodienthoai", "Ngaytao", "LoaiID", "User", "Pass", "Danghi",
            "Hinhanh", "Ngaysinhhat", "Diachi", "loaiDoiTac", "Nhanvien", "Email", "Sdtzalo",
            "Nguoilienhe", "Xaphuong", "Ksd"
        ]

    def create(self, validated_data):
        # Sinh Makhach nếu chưa có
        def generate_makhach():
            return 'KH' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

        makhach = validated_data.get('Makhach') or generate_makhach()

        # Gán Ngaytao nếu trống
        ngaytao = validated_data.get('Ngaytao')
        if not ngaytao:
            ngaytao = datetime.datetime.utcnow()

        # Xử lý hình ảnh hex → binary
        hinhanh_hex = validated_data.pop('Hinhanh', '')
        hinhanh_binary = binascii.unhexlify(hinhanh_hex) if hinhanh_hex else None

        # Xử lý LoaiID
        loai_id = validated_data.pop("LoaiID", None)
        loai_instance = Aadsvitri.objects.filter(pk=loai_id).first() if loai_id else None

        # Xử lý Nhanvien
        nhanvien_id = validated_data.pop("Nhanvien", None)
        nhanvien_instance = Abdsnhanvien.objects.filter(pk=nhanvien_id).first() if nhanvien_id else None

        # Xử lý Xaphuong nested
        xa_data = validated_data.pop('Xaphuong')
        # Tìm tỉnh
        tinh_instance = AAbdstinhthanh.objects.get(Matinh=xa_data["tinh"])
        # Tìm huyện thuộc tỉnh
        huyen_instance = AAcdshuyen.objects.get(
            Mahuyen=xa_data["huyen"],
            Matinh=tinh_instance
        )
        # Tìm xã thuộc huyện
        xaphuong_instance = AAcdsxa.objects.get(
            Maxa=xa_data["xa"],
            Mahuyen=huyen_instance
        )

        # Tạo khách hàng
        khach = AAddskhach.objects.create(
            Makhach=makhach,
            Tenkhach=validated_data["Tenkhach"],
            Sodienthoai=validated_data["Sodienthoai"],
            Ngaytao=ngaytao,
            LoaiID=loai_instance,
            User=validated_data.get("User"),
            Pass=validated_data.get("Pass"),
            Danghi=validated_data.get("Danghi"),
            Hinhanh=hinhanh_binary,
            Ngaysinhhat=validated_data.get("Ngaysinhhat"),
            Diachi=validated_data["Diachi"],
            loaiDoiTac=validated_data["loaiDoiTac"],
            Nhanvien=nhanvien_instance,
            Email=validated_data.get("Email"),
            Sdtzalo=validated_data.get("Sdtzalo"),
            Nguoilienhe=validated_data.get("Nguoilienhe"),
            Xaphuong=xaphuong_instance,
            Ksd=validated_data.get("Ksd")
        )

        return khach

    def to_representation(self, instance):
        # Chỉ trả về 4 trường
        return {
            "Makhach": instance.Makhach,
            "Tenkhach": instance.Tenkhach,
            "Sodienthoai": instance.Sodienthoai,
            "Ngaytao": instance.Ngaytao.isoformat()
        }