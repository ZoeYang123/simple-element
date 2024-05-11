```yaml
name: Test and deploy

on: # 触发条件，这里是代码被push时，发生在master分支
  push:
    branches:
      - master

jobs:
  test:
    name: Run Lint and Test
    runs-on: ubuntu-lastest

    steps:
      - name: Checkout repo # 步骤名称
        uses: actions/checkout@v3 # 使用actions/checkout@v3 检出代码

      - name: Setup Node
        uses: actions/setup-npde@v3

      - name: Install pnpm
        run: pnpm install -g pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile # 使用了pnpm工具来执行安装操作，并通过--frozen-lockfile选项确保安装的依赖项版本与项目锁定文件中指定的版本一致

      - name: Run tests
        run: pnpm run test

  build: # 定义一个名Build docs的job
    name: Build docs
    runs-on: ubuntu-latest # 制度运行环境为最新的ubuntu
    needs: test # 此job依赖于test job，test job执行成功后才执行

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3

      - name: Install pnpm
        run: pnpm install -g pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build docs
        run: pnpm run docs:build

      - name: Upload docs
        uses: actions/upload-artifact@v3
        with:
          name: docs
          path: ./packages/docs/.vitepress/dist

  deploy:
    name: Deploy to Github Pages
    runs-on: ubuntu-lastest
    needs: build

    steps:
      - name: Download docs
        uses: actions/download-artifact@v3
        with:
          name: docs

      - name: Deploy to Github Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GIT_TOKEN }}
          publish_dir: .
```
