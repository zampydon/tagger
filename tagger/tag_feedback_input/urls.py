from .views import BuyerView, MarketView, CommodityView, QualityView, TagView, CommentView, FeedbackView, PostView, InterestIssueView
from rest_framework.routers import DefaultRouter
from django.urls import path
# urlpatterns = [
#     path('', BuyerView.as_view()),
#     path('<id>', BuyerView.as_view())
# ]
router = DefaultRouter()

router.register('buyer', BuyerView, basename='buyer')
urlpatterns = router.urls
router.register('market', MarketView, basename='market')
urlpatterns += router.urls
router.register('commodity', CommodityView, basename='commodity')
urlpatterns += router.urls
router.register('quality', QualityView, basename='quality')
urlpatterns += router.urls
router.register('tag', TagView, basename='tag')
urlpatterns += router.urls
router.register('comment', CommentView, basename='comment')
urlpatterns += router.urls
router.register('feedback', FeedbackView, basename='feedback')
urlpatterns += router.urls
router.register('post', PostView, basename='post')
urlpatterns += router.urls
router.register('interest-issue', InterestIssueView, basename='interest-issue')
urlpatterns += router.urls
# router.register('timeline', TimelineView, basename='timeline')
# urlpatterns += router.urls
# router.register(r'ajax-quality/<commodity_id>', FetchQualityView, basename="MyQuerySet")
# urlpatterns += router.urls
