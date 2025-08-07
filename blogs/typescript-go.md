# 阅读 typescript-go 源码笔记

下载代码：
```bash 
git clone git@github.com:microsoft/typescript-go.git
```


### 目录结构
关键两个主目录就是 internal 和 cmd
```txt
.
├── CHANGES.md
├── CODE_OF_CONDUCT.md
├── Herebyfile.mjs
├── LICENSE
├── NOTICE.txt
├── README.md
├── SECURITY.md
├── SUPPORT.md
├── _build
│   └── azure-pipelines.compliance.yml
├── _extension
│   ├── LICENSE
│   ├── README.md
│   ├── logo.png
│   ├── package.json
│   ├── src
│   └── tsconfig.json
├── _packages
│   ├── api
│   ├── ast
│   └── native-preview
├── _submodules
│   └── TypeScript
├── _tools
│   ├── cmd
│   ├── customlint
│   ├── go.mod
│   └── go.sum
├── cmd
│   └── tsgo
├── go.mod
├── go.sum
├── internal
│   ├── api
│   ├── ast
│   ├── astnav
│   ├── binder
│   ├── bundled
│   ├── checker
│   ├── collections
│   ├── compiler
│   ├── core
│   ├── diagnostics
│   ├── diagnosticwriter
│   ├── evaluator
│   ├── execute
│   ├── format
│   ├── fourslash
│   ├── incremental
│   ├── jsnum
│   ├── jsonutil
│   ├── ls
│   ├── lsp
│   ├── lsutil
│   ├── module
│   ├── modulespecifiers
│   ├── nodebuilder
│   ├── outputpaths
│   ├── packagejson
│   ├── parser
│   ├── pprof
│   ├── printer
│   ├── project
│   ├── repo
│   ├── scanner
│   ├── semver
│   ├── sourcemap
│   ├── stringutil
│   ├── testrunner
│   ├── testutil
│   ├── transformers
│   ├── tsoptions
│   ├── tspath
│   └── vfs
├── package-lock.json
├── package.json
└── testdata
    ├── baselines
    ├── fixtures
    ├── submoduleAccepted.txt
    └── tests

```

### 随便看看`internal/core`,学习一下别人代码风格、和泛型
