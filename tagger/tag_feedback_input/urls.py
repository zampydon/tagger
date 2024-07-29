from django.urls import path
from .views import BuyerView
from rest_framework.routers import SimpleRouter
# urlpatterns = [
#     path('', BuyerView.as_view()),
#     path('<id>', BuyerView.as_view())
# ]


router = SimpleRouter()

# router.register('',BuyerView)
router.register('',BuyerView)
urlpatterns = router.urls
