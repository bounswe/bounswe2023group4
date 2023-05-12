from django.db import migrations, models


class Migration(migrations.Migration):

    operations = [
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=255)),
                ('firstOption', models.CharField(max_length=255)),
                ('secondOption', models.CharField(max_length=255)),
                ('thirdOption', models.CharField(max_length=255, null=True)),
                ('fourthOption', models.CharField(max_length=255, null=True)),
            ]
        )
    ]