# Generated by Django 4.2.1 on 2023-05-12 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_league_season_standing'),
    ]

    operations = [
        migrations.CreateModel(
            name='Weather',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=50)),
                ('main', models.CharField(max_length=50)),
                ('temp', models.DecimalField(decimal_places=5, max_digits=15)),
                ('windspeed', models.DecimalField(decimal_places=5, max_digits=15)),
            ],
        ),
    ]
