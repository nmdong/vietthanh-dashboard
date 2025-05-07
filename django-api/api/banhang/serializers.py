from rest_framework import serializers
from .models import *

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