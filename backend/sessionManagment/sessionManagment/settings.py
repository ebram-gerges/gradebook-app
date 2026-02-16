"""
Django settings for sessionManagment project.
"""

import os
from pathlib import Path

import dj_database_url  # Needed for Supabase connection

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
# In a real production app, use: os.environ.get('SECRET_KEY')
SECRET_KEY = "django-insecure-zfh82a(qaq_f!gztoe*t_qhtei3ir49d^ptc#lkbubf11n9+8+"

# SECURITY WARNING: don't run with debug turned on in production!
# automatically turns off DEBUG when running on Render
DEBUG = "RENDER" not in os.environ

ALLOWED_HOSTS = ["*"]

# Application definition

INSTALLED_APPS = [
    # 1. Add Cloudinary Apps (Order matters!)
    "cloudinary_storage",
    "cloudinary",
    "groups",
    "corsheaders",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # CORS should be high up
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # Whitenoise for static files
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "sessionManagment.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "sessionManagment.wsgi.application"

# CORS SETTINGS
CORS_ALLOW_ALL_ORIGINS = True

# Database
# Switch to Supabase (Postgres) if on Render, else use local SQLite
if "DATABASE_URL" in os.environ:
    DATABASES = {
        "default": dj_database_url.config(
            default=os.environ.get("DATABASE_URL"), conn_max_age=600
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# --- STATIC FILES (CSS, JS) ---
# WhiteNoise handles this in production
STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# --- MEDIA FILES (Images/Uploads) ---
# Cloudinary Configuration
CLOUDINARY_STORAGE = {
    "CLOUD_NAME": "djnzv7vji",
    "API_KEY": "774972919296679",
    "API_SECRET": "K6iB8VCpRbpDhooiLUziRC-hE0c",
}

# Tell Django to use Cloudinary for uploaded media
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"
MEDIA_URL = "/media/"  # Cloudinary handles the actual URL generation
