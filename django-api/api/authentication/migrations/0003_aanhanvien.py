# Generated by Django 3.2.13 on 2025-04-20 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_authentication', '0002_customer'),
    ]

    operations = [
        migrations.CreateModel(
            name='AANhanVien',
            fields=[
                ('MSNV1', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('TenNV', models.CharField(max_length=100)),
            ],
        ),
    ]
