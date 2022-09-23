from apscheduler.schedulers.background import BackgroundScheduler
from django.conf import settings
from .views import redisViewsDataExport


def start():
    scheduler=BackgroundScheduler()
    # @scheduler.scheduled_job('cron', hour='2, 12', minute='30, 30', name = 'auto_views') # 매일 2시 30분, 12시 30분에 실행
    @scheduler.scheduled_job('interval', seconds=7, name = 'auto_views')
    def auto_views():
        
        redisViewsDataExport()
    scheduler.start()
