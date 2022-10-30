FROM php:8.1-fpm

# ARG user
# ARG uid

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    default-mysql-client \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    autoconf \
    pkg-config \
    libzip-dev \
    zlib1g-dev \
    libssl-dev \
    libssl-doc \
    libsasl2-dev \
    libonig-dev \
    libcurl4-openssl-dev \
    ca-certificates

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd sockets \
    && pecl install -o -f redis\
    && docker-php-ext-enable redis

#jpeg GD ext
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd


ENV PHP_MEMORY_LIMIT=1G\
    UPLOAD_MAX_FILESIZE=256M\
    POST_MAX_SIZE=256M

RUN echo 'memory_limit = -1' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini;

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/backend

# COPY ./wait-for-it.sh /usr/local/bin/wait-for-it
# RUN chmod +x /usr/local/bin/wait-for-it

RUN chown -R www-data:www-data ./
# RUN chmod 777 -R ./storage

ADD ./ /var/www/backend



# # Add user permission folder
RUN chown -R www-data:www-data /var/www/backend


# RUN composer install
RUN composer install

COPY ./.env.example /var/www/backend/.env

USER www-data