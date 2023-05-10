from django.db import migrations, models


class Migration(migrations.Migration):

    operations = [
        migrations.CreateModel(
            name='Weather',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country' , models.CharField(max_length=50)), 
                ('name' , models.CharField(max_length=50)),
                ('description' , models.CharField(max_length=50)),
                ('main' , models.CharField(max_length=50)),
                ('temp' , models.DecimalField(max_digits=15,decimal_places=5)),
                ('windspeed' , models.DecimalField(max_digits=15,decimal_places=5))
            ]
        )
    ]
