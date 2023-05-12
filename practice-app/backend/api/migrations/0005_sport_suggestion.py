from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_league_season_standing')
    ]
    operations = [
        migrations.CreateModel(
            name='SportSuggestion',
            fields=[
                ('id', models.AutoField(primary_key=True)),
                ('suggestion', models.CharField(max_length=254)),
            ],
        ),
    ]
