# Generated by Django 5.0.6 on 2024-07-08 15:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_post_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='user',
        ),
    ]
