from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from .models import UserProfile, Post, Like
from django.contrib.auth import get_user_model

User = get_user_model()

class PostTests(APITestCase):

    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='password1')
        self.user2 = User.objects.create_user(username='user2', password='password2')
        self.post1 = Post.objects.create(title='Post 1', content='Content 1', user=self.user1)
        self.post2 = Post.objects.create(title='Post 2', content='Content 2', user=self.user2)
        Like.objects.create(post=self.post1, user=self.user2)
        Like.objects.create(post=self.post2, user=self.user1)
        self.client = APIClient()

        # Generate token for user1
        self.token1 = Token.objects.create(user=self.user1)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key)

    def test_get_all_posts(self):
        url = reverse('post-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['like_count'], 1)  # Assuming post1 is first
        self.assertEqual(response.data[1]['like_count'], 1)  # Assuming post2 is second

    def test_get_user_profile(self):
        url = reverse('user-detail', kwargs={'pk': self.user1.id})
        response = self.client.get(url, format='json')
        print(f"Response data: {response.data}")    # Debugging statement
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['total_likes'], 1)
