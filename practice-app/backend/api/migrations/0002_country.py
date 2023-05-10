# Generated by Django 4.2.1 on 2023-05-10 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('capital', models.CharField(max_length=50)),
                ('population', models.IntegerField(default=0)),
                ('gdp', models.IntegerField(default=0)),
            ],
        ),
    ]
