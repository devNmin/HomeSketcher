from apscheduler.schedulers.background import BackgroundScheduler
from django.conf import settings
from .views import redisViewsDataExport


def start():
    scheduler=BackgroundScheduler()
    # @scheduler.scheduled_job('cron', hour='2, 12', minute='30, 30', name = 'auto_views') # 매일 2시 30분, 12시 30분에 실행
    @scheduler.scheduled_job('interval', hour=2, name = 'redis_export') # 매일 2시 실행
    def redis_export():
        redisViewsDataExport()
    scheduler.start()
