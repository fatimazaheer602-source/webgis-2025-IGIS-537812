"""
Django settings for webgis project.
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# GeoDjango needs the GDAL, GEOS and PROJ libraries. On Windows they come
# from OSGeo4W; putting its bin folder on PATH lets Django find them.
# On this machine OSGeo4W is installed in the root of the F: drive.
if os.name == "nt":
    OSGEO4W = r"F:"
    os.environ["OSGEO4W_ROOT"] = OSGEO4W
    os.environ["GDAL_DATA"] = OSGEO4W + r"\share\gdal"
    os.environ["PROJ_DATA"] = OSGEO4W + r"\share\proj"
    os.environ["PROJ_LIB"] = OSGEO4W + r"\share\proj"
    os.environ["PATH"] = OSGEO4W + r"\bin;" + os.environ["PATH"]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-=*$f9*4l&8y=%uhgp(2#k%mq^9%-%lt98j&zsju*oy5aul0@&#'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.gis",
    "districts",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "webgis.urls"

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

WSGI_APPLICATION = "webgis.wsgi.application"


# Database
# The password is read from an environment variable so that it is never
# written into a file that gets committed to GitHub.

DATABASES = {
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        "NAME": "webgis",
        "USER": "postgres",
        "PASSWORD": os.environ.get("WEBGIS_DB_PASSWORD", ""),
        "HOST": "localhost",
        "PORT": "5432",
    }
}


# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

STATIC_URL = "static/"