FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends \
        tree \
        curl \
        unzip \
        ca-certificates \
        jq \
    && rm -rf /var/lib/apt/lists/*
