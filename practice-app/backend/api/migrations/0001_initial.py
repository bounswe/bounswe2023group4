# Generated by Django 4.2.1 on 2023-05-07 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

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
    
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=250)),
                ('Year', models.CharField(max_length=4)),
                ('imdbID', models.CharField(max_length=250)),
                ('Type', models.CharField(max_length=250)),
            ],
        ),
    ]