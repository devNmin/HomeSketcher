from django.apps import AppConfig
from django.conf import settings
import os

class SchedulersConfig(AppConfig):
    name = 'schedulers'

    def ready(self):
        if os.environ.get('RUN_MAIN', None) != 'true':
            if settings.SCHEDULER_DEFAULT:
                from schedulers import operator
                operator.start()