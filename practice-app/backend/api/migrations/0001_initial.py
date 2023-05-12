from django.db import migrations, models


class Migration(migrations.Migration):

    operations = [
   
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