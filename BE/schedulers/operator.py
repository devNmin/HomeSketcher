from apscheduler.schedulers.background import BackgroundScheduler
from django.conf import settings
from .views import redisViewsDataExport
from util.recom import read_views


def start():
    scheduler=BackgroundScheduler()
    # @scheduler.scheduled_job('cron', hour='2, 12', minute='30, 30', name = 'auto_views') # 매일 2시 30분, 12시 30분에 실행
    @scheduler.scheduled_job('cron',hour='2', name = 'auto_views') # 매일 2시 실행
    def auto_views():
        # print(read_views(13,1))
        redisViewsDataExport()
        # print(read_views(13,1))
    scheduler.start()


