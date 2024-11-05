# auth_app/urls.py
from django.urls import path
from .views import UserCreateView, CustomTokenObtainPairView, UserStatusView, TestAuthView, PostListCreateView, PostListCreateView, ProtectedView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('status/', UserStatusView.as_view(), name='user_status'),
    path('test-auth/', TestAuthView.as_view(), name='test_auth'),
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('page/',  ProtectedView.as_view(), name="protected-page-view")
]
