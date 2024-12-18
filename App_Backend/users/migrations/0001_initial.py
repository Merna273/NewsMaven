# Generated by Django 4.2.13 on 2024-11-18 12:19

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("user_id", models.AutoField(primary_key=True, serialize=False)),
                ("user_name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=255, unique=True)),
                ("user_password", models.CharField(max_length=255)),
            ],
            options={
                "db_table": "User",
                "managed": False,
            },
        ),
    ]
