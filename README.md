# mexican-dying-sam

## 構築に関するメモ

### 1. プロジェクトの初期化
```bash
(*'-')< $ yarn create nuxt-app mexican-dying-sam
yarn create v1.21.1
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...

success Installed "create-nuxt-app@2.15.0" with binaries:
      - create-nuxt-app
[###########################################################################################################################################] 339/339
create-nuxt-app v2.15.0
✨  Generating Nuxt.js project in mexican-dying-sam
? Project name mexican-dying-sam
? Project description sam is dying
? Author name shztmk
? Choose programming language TypeScript
? Choose the package manager Yarn
? Choose UI framework Tailwind CSS
? Choose custom server framework Express
? Choose Nuxt.js modules Progressive Web App (PWA) Support, DotEnv
? Choose linting tools ESLint, Prettier, Lint staged files, StyleLint
? Choose test framework Jest
? Choose rendering mode Universal (SSR)
? Choose development tools (Press <space> to select, <a> to toggle all, <i> to invert selection)
yarn run v1.21.1

...
```

### 2. Nuxt.js まわりのフォルダを `/app` 以下にまとめて微調整する
- `/app` フォルダを作成し、以下のフォルダを `/app` 以下に移動する
    - assets
    - components
    - layouts
    - middleware
    - pages
    - plugins
    - static
    - store
- nuxt.config.js に `srcDir: 'app/'` を追加する
  - https://ja.nuxtjs.org/api/configuration-srcdir/
- tsconfig.js について `"baseUrl": "./app"` に変更
  - https://www.typescriptlang.org/docs/handbook/module-resolution.html#base-url
* tailwind.config.js のスタイルを直す
* nuxtconfig.js に `// eslint-disable-next-line @typescript-eslint/no-unused-vars` を追記する


### 3. Build Setup を叩いて疎通確認する

#### Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

* ここで一旦コミット

### 4. aws, sam コマンドを叩けるコンテナのためのファイルを追加する
- docker-compose.yaml
- Dockerfile
- Makefile
- credentials.example

`cp -p credentials{.example,}`

### 5. credencial の設定をする

1. 以下のポリシーをアタッチしたグループを作成する
   - arn:aws:iam::aws:policy/AWSLambdaFullAccess
   - arn:aws:iam::aws:policy/IAMFullAccess
   - arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator
   - arn:aws:iam::aws:policy/AWSCloudFormationFullAccess
2. ユーザを上記グループに追加する
3. ユーザのアクセスキーを発行する
4. `credentials` ファイルについて、発行された値で埋める

設定値が正しく反映されているとき `make identity` でアカウント情報を確認できる  
cf. https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-profiles.html

**注意： Credential 情報は、絶対にコミットに含めないこと**

* ここで一旦コミット

### 6. sam コマンドによる初期化を行う

```bash
(*'-')< $ docker-compose run dind sam init --runtime nodejs12.x --name mexico --app-template hello-world

	SAM CLI now collects telemetry to better understand customer needs.

	You can OPT OUT and disable telemetry collection by setting the
	environment variable SAM_CLI_TELEMETRY=0 in your shell.
	Thanks for your help!

	Learn More: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-telemetry.html


Cloning app templates from https://github.com/awslabs/aws-sam-cli-app-templates.git

-----------------------
Generating application:
-----------------------
Name: mexico
Runtime: nodejs12.x
Dependency Manager: npm
Application Template: hello-world
Output Directory: .

Next steps can be found in the README file at ./mexico/README.md
    
t-kono@P325:~/repos/mexican-dying-sam (master *)
(*'-')< $ mv mexico/events .
t-kono@P325:~/repos/mexican-dying-sam (master *)
(*'-')< $ mv mexico/hello-world/app.js server/
t-kono@P325:~/repos/mexican-dying-sam (master *)
(*'-')< $ mv mexico/template.yaml .
t-kono@P325:~/repos/mexican-dying-sam (master *)
(*'-')< $ rm -rf mexico
t-kono@P325:~/repos/mexican-dying-sam (master *)
```

app.js について lint が通るように微調整する
* ここで一旦コミット
