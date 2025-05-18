import openpyxl
from api.banhang.models import AAbdstinhthanh, AAcdshuyen, AAcdsxa  # Đổi `myapp` theo app bạn dùng
from django.db import transaction

@transaction.atomic
def run():
    wb = openpyxl.load_workbook("Ds_Tinh_Huyen_Xa__14_05_2025.xlsx")  # thay bằng đường dẫn thật
    sheet = wb.active

    for row in sheet.iter_rows(min_row=2, values_only=True):  # bỏ qua tiêu đề
        Matinh, Tentinh, Mahuyen, Tenhuyen, Maxa, Tenxa = row

        # Tỉnh
        tinh_obj, _ = AAbdstinhthanh.objects.get_or_create(Matinh=Matinh, defaults={'Tentinh': Tentinh})

        # Huyện
        huyen_obj, _ = AAcdshuyen.objects.get_or_create(
            Mahuyen=Mahuyen, defaults={'Tenhuyen': Tenhuyen, 'Matinh': tinh_obj}
        )

        # Xã
        AAcdsxa.objects.get_or_create(
            Maxa=Maxa, defaults={'Tenxa': Tenxa, 'Mahuyen': huyen_obj}
        )

    print("Import thành công!")
