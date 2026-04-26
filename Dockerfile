FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Set the working directory
WORKDIR /app

ENV USERNAME=playwright
ENV PASSWORD=playwright

# Copy your test scripts and package.json to the container
COPY . .

# Install dependencies including Playwright packages
RUN npm install
RUN npx playwright install

# Run the tests when the container starts
CMD ["npx", "playwright", "test"]