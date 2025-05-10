from rest_framework import serializers, exceptions
from django.contrib.auth import authenticate
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

from api.authentication.models import ActiveSession
from rest_framework_simplejwt.tokens import RefreshToken


def _generate_jwt_token(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token)
    }


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if not email:
            raise exceptions.ValidationError(
                {"success": False, "msg": "Email is required to login"}
            )
        if not password:
            raise exceptions.ValidationError(
                {"success": False, "msg": "Password is required to log in."}
            )

        user = authenticate(username=email, password=password)

        if user is None:
            raise exceptions.AuthenticationFailed(
                {"success": False, "msg": "Wrong credentials"}
            )

        if not user.is_active:
            raise exceptions.ValidationError(
                {"success": False, "msg": "User is not active"}
            )

        token_data = _generate_jwt_token(user)

        # Lưu session mới hoặc cập nhật nếu đã tồn tại
        session, _ = ActiveSession.objects.update_or_create(
            user=user,
            defaults={"token": token_data}
        )

        return {
            "success": True,
            "token": token_data,
            "user": {
                "_id": user.pk,
                "username": user.username,
                "email": user.email
            },
        }
