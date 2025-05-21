import { memo, useEffect, useRef } from "react";

export const HackMemo = memo(function Hack({ hackNb = 0 }: { hackNb?: number }) {
  const refDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (refDiv.current) refDiv.current.innerHTML = hackNb === 0 ? setHack() : setHack() + setHack2();
    const doScroll = setInterval(() => {
      if (refDiv.current) {
        refDiv.current.scrollTop += 5 + 20 * Math.round(Math.pow(Math.random(), 5));
        if (refDiv.current.scrollTop >= refDiv.current.scrollHeight - refDiv.current.clientHeight - 100) {
          if (hackNb === 0) {
            refDiv.current.scrollTop = 0;
          } else {
            clearInterval(doScroll);
          }
        }
      }
    }, 10);
    return () => clearInterval(doScroll);
  }, [hackNb]);

  return <div ref={refDiv} className="size-full flex-col overflow-hidden text-xs text-primary px-1"></div>;
});

function setHack() {
  const hack: string = `You have 8 outdated formulae installed.    <br>
  You can upgrade them with brew upgrade    <br>
  or list them with brew outdated.    <br>
  smart.phonics@MonAL2 ~ % brew upgrade    <br>
  ==> <strong>Upgrading </strong>8 outdated packages:    <br>
  <strong>flyctl</strong> 0.3.39 -> 0.3.46    <br>
  <strong><strong>micro<strong>smart.phonics</strong></strong></strong> 1.24.0 -> 1.24.1    <br>
  <strong>sqlite</strong> 3.47.0 -> 3.47.1    <br>
  nginx 1.27.2 -> 1.27.3    <br>    <br>
  ca-certificates 2024-09-24 -> 2024-11-26    <br>
  node 23.2.0_1 -> 23.3.0    <br>
  <strong>smart.phonics</strong>@3.11 3.11.10 -> 3.11.11    <br>
  <strong>git</strong>2.47.0 -> 2.47.1    <br>
  ==> Pouring <strong>sqlite</strong>--3.47.1.ventura.bottle.tar.gz    <br>
    /usr/local/Cellar/<strong>sqlite</strong>/3.47.1: 12 files, 4.9MB    <br>
  ==> Running 'brew cleanup <strong>sqlite</strong>'...    <br>
  Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.    <br>
  Hide these hints with HOMEBREW_NO_ENV_HINTS (see 'man brew').    <br>
  <strong>Removing: </strong>/usr/local/Cellar/<strong>sqlite</strong>/3.47.0... (12 files, 4.9MB)    <br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>sqlite</strong>_bottle_manifest--3.47.0... (9.4KB)    <br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>sqlite</strong>--3.47.0... (2.3MB)    <br>
  ==> <strong>Upgrading </strong><strong><strong>micro<strong>smart.phonics</strong></strong></strong>    <br>
    1.24.0 -> 1.24.1     <br>
  ==> Pouring <strong><strong>micro<strong>smart.phonics</strong></strong></strong>--1.24.1.ventura.bottle.tar.gz    <br>
    /usr/local/Cellar/<strong>micro<strong>smart.phonics</strong></strong>/1.24.1: 7 files, 1MB    <br>
  ==> Running 'brew cleanup <strong><strong>micro<strong>smart.phonics</strong></strong></strong>'...    <br>
  <strong>Removing: </strong>/usr/local/Cellar/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/1.24.0... (7 files, 1MB)    <br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>_bottle_manifest--1.24.0... (9.5KB)    <br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>--1.24.0... (492.2KB)    <br>
  ==> <strong>Upgrading </strong>ca-certificates    <br>
    2024-09-24 -> 2024-11-26     <br>
  ==> Pouring ca-certificates--2024-11-26.all.bottle.tar.gz    <br>
  ==> Regenerating CA certificate bundle from keychain, this may take a while...    <br>
    /usr/local/Cellar/ca-certificates/2024-11-26: 4 files, 239.4KB    <br>
  ==> Running 'brew cleanup ca-certificates'...    <br>
  <strong>Removing: </strong>/usr/local/Cellar/ca-certificates/2024-09-24... (4 files, 237.4KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates_bottle_manifest--2024-09-24... (1.9KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates--2024-09-24... (132.6KB)<br>
  ==> <strong>Upgrading </strong>nginx<br>
    1.27.2 -> 1.27.3 <br>
  ==> Pouring nginx--1.27.3.ventura.bottle.1.tar.gz<br>
  ==> Caveats<br>
  Docroot is: /usr/local/var/www<br>
  The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that<br>
  nginx can run without sudo.<br>
  nginx will load all files in /usr/local/etc/nginx/servers/.<br>
  To start nginx now and restart at login:<br>
    brew services start nginx<br>
  Or, if you don't want/need a background service you can just run:<br>
    /usr/local/opt/nginx/bin/nginx -g daemon\ off\;<br>
  ==> Summary<br>
    /usr/local/Cellar/nginx/1.27.3: 27 files, 2.5MB<br>
  ==> Running 'brew cleanup nginx'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/nginx/1.27.2... (27 files, 2.5MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx_bottle_manifest--1.27.2... (10KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx--1.27.2... (1.4MB)<br>
  ==> <strong>Upgrading </strong>node<br>
    23.2.0_1 -> 23.3.0 <br>
  ==> Pouring node--23.3.0.ventura.bottle.tar.gz<br>
  /usr/local/Cellar/node/23.3.0: 2,676 files, 88.2MB<br>
  ==> Running 'brew cleanup node'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/node/23.2.0_1... (2,676 files, 88.2MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node_bottle_manifest--23.2.0_1... (16.2KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node--23.2.0_1... (21.1MB)<br>
  ==> <strong>Upgrading </strong><strong>smart.phonics</strong>@3.11<br>
    3.11.10 -> 3.11.11 <br>
  ==> Pouring <strong>smart.phonics</strong>@3.11--3.11.11.ventura.bottle.tar.gz<br>
  ==> /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11/bin/<strong>smart.phonics</strong>3.11 -Im ensurepip<br>
  ==> /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11/bin/<br>
  <strong>smart.phonics</strong>3.11 -Im pip <strong>install </strong>-v --no-index --upgrade --isolated --target=/usr/local/lib/<strong>smart.phonics</strong>3.11/site-<br>
  ==> Caveats<br>
  <strong>smart.phonics</strong> is installed as<br>
    /usr/local/bin/<strong>smart.phonics</strong>3.11<br>
  Unversioned and major-versioned symlinks '<strong>smart.phonics</strong>', '<strong>smart.phonics</strong>3', '<strong>smart.phonics</strong>-config', '<strong>smart.phonics</strong>3-config', 'pip', 'pip3', etc. pointing to<br>
  '<strong>smart.phonics</strong>3.11', '<strong>smart.phonics</strong>3.11-config', 'pip3.11' etc., respectively, are installed into<br>
    /usr/local/opt/<strong>smart.phonics</strong>@3.11/libexec/bin<br>
  You can <strong>install </strong><strong>smart.phonics</strong> packages with<br>
    pip3.11 <strong>install </strong><package><br>
  They will <strong>install </strong>into the site-package directory<br>
    /usr/local/lib/<strong>smart.phonics</strong>3.11/site-packages<br>
  tkinter is no longer included with this formula, but it is available separately:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>-tk@3.11<br>
  gdbm ('dbm.gnu') is no longer included in this formula, but it is available separately:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>-gdbm@3.11<br>
  'dbm.ndbm' changed database backends in Homebrew <strong>smart.phonics</strong> 3.11.<br>
  If you need to read a database from a previous Homebrew <strong>smart.phonics</strong> created via 'dbm.ndbm',<br>
  you'll need to read your database using the older version of Homebrew <strong>smart.phonics</strong> and convert to another format.<br>
  'dbm' still defaults to 'dbm.gnu' when it is installed.<br>
  If you do not need a specific version of <strong>smart.phonics</strong>, and always want Homebrew's '<strong>smart.phonics</strong>3' in your PATH:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>3<br>
  For more information about Homebrew and <strong>smart.phonics</strong>, see: https://docs.brew.sh/Homebrew-and-<strong>smart.phonics</strong><br>
  ==> Summary<br>
  /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11: 3,304 files, 61.3MB<br>
  ==> Running 'brew cleanup <strong>smart.phonics</strong>@3.11'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.10... (3,304 files, 61.3MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>smart.phonics</strong>@3.11_bottle_manifest--3.11.10... (28.2KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>smart.phonics</strong>@3.11--3.11.10... (15MB)<br>
  ==> <strong>Upgrading </strong><strong>flyctl</strong><br>
    0.3.39 -> 0.3.46 <br>
  ==> Pouring <strong>flyctl</strong>--0.3.46.ventura.bottle.tar.gz<br>
  ==> Caveats<br>
  zsh completions have been installed to:<br>
    /usr/local/share/zsh/site-functions<br>
  ==> Summary<br>
  /usr/local/Cellar/<strong>flyctl</strong>/0.3.46: 13 files, 62.7MB<br>
  ==> Running 'brew cleanup <strong>flyctl</strong>'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/<strong>flyctl</strong>/0.3.39... (13 files, 62.9MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>flyctl</strong>_bottle_manifest--0.3.39... (7.2KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>flyctl</strong>--0.3.39... (20.9MB)<br>
  ==> <strong>Upgrading </strong>git<br>
    2.47.0 -> 2.47.1 <br>
  ==> Pouring git--2.47.1.ventura.bottle.tar.gz<br>
  ==> Caveats<br>
  The Tcl/Tk GUIs (e.g. gitk, git-gui) are now in the 'git-gui' formula.<br>
  Subversion interoperability (git-svn) is now in the 'git-svn' formula.<br>
  zsh completions and functions have been installed to:<br>
    /usr/local/share/zsh/site-functions<br>
  ==> Summary<br>
  /usr/local/Cellar/git/2.47.1: 1,685 files, 54.6MB<br>
  ==> Running 'brew cleanup git'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/git/2.47.0... (1,684 files, 54.6MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/git_bottle_manifest--2.47.0... (14.2KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/git--2.47.0... (19.9MB)<br>
  ==> Caveats<br>
  ==> nginx<br>
  Docroot is: /usr/local/var/www<br>
  The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that<br>
  nginx can run without sudo.<br>
  nginx will load all files in /usr/local/etc/nginx/servers/.<br>
  To start nginx now and restart at login:<br>
    brew services start nginx<br>
  Or, if you don't want/need a background service you can just run:<br>
    /usr/local/opt/nginx/bin/nginx -g daemon\ off\;<br>
  ==> <strong>smart.phonics</strong>@3.11<br>
  <strong>smart.phonics</strong> is installed as<br>
    /usr/local/bin/<strong>smart.phonics</strong>3.11<br>
  Unversioned and major-versioned symlinks '<strong>smart.phonics</strong>', '<strong>smart.phonics</strong>3', '<strong>smart.phonics</strong>-config', '<strong>smart.phonics</strong>3-config', 'pip', 'pip3', etc. pointing to<br>
  '<strong>smart.phonics</strong>3.11', '<strong>smart.phonics</strong>3.11-config', 'pip3.11' etc., respectively, are installed into<br>
    /usr/local/opt/<strong>smart.phonics</strong>@3.11/libexec/bin<br>
  You can <strong>install </strong><strong>smart.phonics</strong> packages with<br>
    pip3.11 <strong>install </strong><package><br>
  They will <strong>install </strong>into the site-package directory<br>
    /usr/local/lib/<strong>smart.phonics</strong>3.11/site-packages<br>
  tkinter is no longer included with this formula, but it is available separately:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>-tk@3.11<br>
  gdbm ('dbm.gnu') is no longer included in this formula, but it is available separately:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>-gdbm@3.11<br>
  'dbm.ndbm' changed database backends in Homebrew <strong>smart.phonics</strong> 3.11.<br>
  If you need to read a database from a previous Homebrew <strong>smart.phonics</strong> created via 'dbm.ndbm',<br>
  you'll need to read your database using the older version of Homebrew <strong>smart.phonics</strong> and convert to another format.<br>
  'dbm' still defaults to 'dbm.gnu' when it is installed.<br>
  If you do not need a specific version of <strong>smart.phonics</strong>, and always want Homebrew's '<strong>smart.phonics</strong>3' in your PATH:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>3<br>
  For more information about Homebrew and <strong>smart.phonics</strong>, see: https://docs.brew.sh/Homebrew-and-<strong>smart.phonics</strong><br>
  ==> <strong>flyctl</strong><br>
  zsh completions have been installed to:<br>
    /usr/local/share/zsh/site-functions<br>
  ==> git<br>
  The Tcl/Tk GUIs (e.g. gitk, git-gui) are now in the 'git-gui' formula.<br>
  Subversion interoperability (git-svn) is now in the 'git-svn' formula.<br>
  zsh completions and functions have been installed to:<br>
    /usr/local/share/zsh/site-functions<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/manifests/3.47.1<br>
  ==> <strong>Fetching </strong><strong>sqlite</strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/blobs/sha256:3ec83a8caed77476623d709d6d980698f09c0fb267907a2bf8323e6fc5b8439b<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/manifests/1.24.1<br>
  ==> <strong>Fetching </strong><strong><strong>micro<strong>smart.phonics</strong></strong></strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/blobs/sha256:6601736a89957321cdb26111f3d6da67575ee7a5324b1af791cf2370240b259b<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/manifests/2024-11-26<br>
  ==> <strong>Fetching </strong>ca-certificates<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/blobs/sha256:7a3b5f75ca44d330e0f37432af09f58e37bfa873f25d340dece3c3e6c7927657<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/manifests/1.27.3-1<br>
  ==> <strong>Fetching </strong>nginx<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:a522ff78dbf7156230cac0fe298d93fc7fc841650290722caf435513c15476be<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/manifests/23.3.0<br>
  ==> <strong>Fetching </strong>node<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/blobs/sha256:28a491eda835e37fed1f69d12c5967d86c25d5e8aa43c4c5664c6f042d8f6fa7<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/manifests/3.11.11<br>
  ==> <strong>Fetching </strong><strong>smart.phonics</strong>@3.11<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/blobs/sha256:ee9aaacdb633337b49e6294d76317bcbfbab475b6f220f2ee62e67353250c8a6<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/manifests/0.3.46<br>
  ==> <strong>Fetching </strong><strong>flyctl</strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/blobs/sha256:3b7de3da2e6243d4af5035bce6f93055e4883f2277ae7c8722c149f8c45f4b72<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/manifests/2.47.1<br>
  ==> <strong>Fetching </strong>git<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/blobs/sha256:aaa8aee7e2147287d742c407139fad74126ef2d97fc13655657f9bd511b1c818<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/manifests/3.47.1<br>
  ==> <strong>Fetching </strong><strong>sqlite</strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/blobs/sha256:3ec83a8caed77476623d709d6d980698f09c0fb267907a2bf8323e6fc5b8439b<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/manifests/1.24.1<br>
  ==> <strong>Fetching </strong><strong><strong>micro<strong>smart.phonics</strong></strong></strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/blobs/sha256:6601736a89957321cdb26111f3d6da67575ee7a5324b1af791cf2370240b259b<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/manifests/2024-11-26<br>
  ==> <strong>Fetching </strong>ca-certificates<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/blobs/sha256:7a3b5f75ca44d330e0f37432af09f58e37bfa873f25d340dece3c3e6c7927657<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/manifests/1.27.3-1<br>
  ==> <strong>Fetching </strong>nginx<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:a522ff78dbf7156230cac0fe298d93fc7fc841650290722caf435513c15476be<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/manifests/23.3.0<br>
  ==> <strong>Fetching </strong>node<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/blobs/sha256:28a491eda835e37fed1f69d12c5967d86c25d5e8aa43c4c5664c6f042d8f6fa7<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/manifests/3.11.11<br>
  ==> <strong>Fetching </strong><strong>smart.phonics</strong>@3.11<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/blobs/sha256:ee9aaacdb633337b49e6294d76317bcbfbab475b6f220f2ee62e67353250c8a6<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/manifests/0.3.46<br>
  ==> <strong>Fetching </strong><strong>flyctl</strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/blobs/sha256:3b7de3da2e6243d4af5035bce6f93055e4883f2277ae7c8722c149f8c45f4b72<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/manifests/2.47.1<br>
  ==> <strong>Fetching </strong>git<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/blobs/sha256:aaa8aee7e2147287d742c407139fad74126ef2d97fc13655657f9bd511b1c818<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/manifests/3.47.1<br>
  ==> <strong>Fetching </strong><strong>sqlite</strong><br>
  ==> Pouring ca-certificates--2024-11-26.all.bottle.tar.gz<br>
  ==> Regenerating CA certificate bundle from keychain, this may take a while...<br>
    /usr/local/Cellar/ca-certificates/2024-11-26: 4 files, 239.4KB<br>
  ==> Running 'brew cleanup ca-certificates'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/ca-certificates/2024-09-24... (4 files, 237.4KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates_bottle_manifest--2024-09-24... (1.9KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates--2024-09-24... (132.6KB)<br>
  ==> <strong>Upgrading </strong>nginx<br>
    1.27.2 -> 1.27.3 <br>
  ==> Pouring nginx--1.27.3.ventura.bottle.1.tar.gz<br>
  ==> Caveats<br>
  Docroot is: /usr/local/var/www<br>
  The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that<br>
  nginx can run without sudo.<br>
  nginx will load all files in /usr/local/etc/nginx/servers/.<br>
  To start nginx now and restart at login:<br>
    brew services start nginx<br>
  Or, if you don't want/need a background service you can just run:<br>
    /usr/local/opt/nginx/bin/nginx -g daemon\ off\;<br>
  ==> Summary<br>
    /usr/local/Cellar/nginx/1.27.3: 27 files, 2.5MB<br>
  ==> Running 'brew cleanup nginx'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/nginx/1.27.2... (27 files, 2.5MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx_bottle_manifest--1.27.2... (10KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx--1.27.2... (1.4MB)<br>
  ==> <strong>Upgrading </strong>node<br>
    23.2.0_1 -> 23.3.0 <br>
  ==> Pouring node--23.3.0.ventura.bottle.tar.gz<br>
  /usr/local/Cellar/node/23.3.0: 2,676 files, 88.2MB<br>
  ==> Running 'brew cleanup node'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/node/23.2.0_1... (2,676 files, 88.2MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node_bottle_manifest--23.2.0_1... (16.2KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node--23.2.0_1... (21.1MB)<br>
  ==> <strong>Upgrading </strong><strong>smart.phonics</strong>@3.11<br>
    3.11.10 -> 3.11.11 <br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/blobs/sha256:3ec83a8caed77476623d709d6d980698f09c0fb267907a2bf8323e6fc5b8439b<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong><strong>micro<strong>smart.phonics</strong></strong></strong>/manifests/1.24.1<br>
  ==> <strong>Fetching </strong><strong>micro<strong>smart.phonics</strong></strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>micro<strong>smart.phonics</strong></strong>/blobs/sha256:6601736a89957321cdb26111f3d6da67575ee7a5324b1af791cf2370240b259b<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/manifests/2024-11-26<br>
  ==> <strong>Fetching </strong>ca-certificates<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/blobs/sha256:7a3b5f75ca44d330e0f37432af09f58e37bfa873f25d340dece3c3e6c7927657<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/manifests/1.27.3-1<br>
  ==> <strong>Fetching </strong>nginx<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:a522ff78dbf7156230cac0fe298d93fc7fc841650290722caf435513c15476be<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/manifests/23.3.0<br>
  ==> <strong>Fetching </strong>node<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/blobs/sha256:28a491eda835e37fed1f69d12c5967d86c25d5e8aa43c4c5664c6f042d8f6fa7<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/manifests/3.11.11<br>
  ==> <strong>Fetching </strong><strong>smart.phonics</strong>@3.11<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/blobs/sha256:ee9aaacdb633337b49e6294d76317bcbfbab475b6f220f2ee62e67353250c8a6<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/manifests/0.3.46<br>
  ==> <strong>Fetching </strong><strong>flyctl</strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/blobs/sha256:3b7de3da2e6243d4af5035bce6f93055e4883f2277ae7c8722c149f8c45f4b72<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/manifests/2.47.1<br>
  ==> <strong>Fetching </strong>git<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/blobs/sha256:aaa8aee7e2147287d742c407139fad74126ef2d97fc13655657f9bd511b1c818<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/manifests/3.47.1<br>
  ==> <strong>Fetching </strong><strong>sqlite</strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/blobs/sha256:3ec83a8caed77476623d709d6d980698f09c0fb267907a2bf8323e6fc5b8439b<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>micro<strong>smart.phonics</strong></strong>/manifests/1.24.1<br>
  ==> <strong>Fetching </strong><strong>micro<strong>smart.phonics</strong></strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>micro<strong>smart.phonics</strong></strong>/blobs/sha256:6601736a89957321cdb26111f3d6da67575ee7a5324b1af791cf2370240b259b<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/manifests/2024-11-26<br>
  ==> <strong>Fetching </strong>ca-certificates<br>
  <strong>smart.phonics</strong> is installed as<br>
    /usr/local/bin/<strong>smart.phonics</strong>3.11<br>
  Unversioned and major-versioned symlinks '<strong>smart.phonics</strong>', '<strong>smart.phonics</strong>3', '<strong>smart.phonics</strong>-config', '<strong>smart.phonics</strong>3-config', 'pip', 'pip3', etc. pointing to<br>
  '<strong>smart.phonics</strong>3.11', '<strong>smart.phonics</strong>3.11-config', 'pip3.11' etc., respectively, are installed into<br>
    /usr/local/opt/<strong>smart.phonics</strong>@3.11/libexec/bin<br>
  You can <strong>install </strong><strong>smart.phonics</strong> packages with<br>
    pip3.11 <strong>install </strong><package><br>
  They will <strong>install </strong>into the site-package directory<br>
    /usr/local/lib/<strong>smart.phonics</strong>3.11/site-packages<br>
  tkinter is no longer included with this formula, but it is available separately:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>-tk@3.11<br>
  gdbm ('dbm.gnu') is no longer included in this formula, but it is available separately:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>-gdbm@3.11<br>
  'dbm.ndbm' changed database backends in Homebrew <strong>smart.phonics</strong> 3.11.<br>
  If you need to read a database from a previous Homebrew <strong>smart.phonics</strong> created via 'dbm.ndbm',<br>
  you'll need to read your database using the older version of Homebrew <strong>smart.phonics</strong> and convert to another format.<br>
  'dbm' still defaults to 'dbm.gnu' when it is installed.<br>
  If you do not need a specific version of <strong>smart.phonics</strong>, and always want Homebrew's '<strong>smart.phonics</strong>3' in your PATH:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>3<br>
  For more information about Homebrew and <strong>smart.phonics</strong>, see: https://docs.brew.sh/Homebrew-and-<strong>smart.phonics</strong><br>
  ==> <strong>flyctl</strong><br>
  zsh completions have been installed to:<br>
    /usr/local/share/zsh/site-functions<br>
  ==> <strong>git</strong><br>
  The Tcl/Tk GUIs (e.g. gitk, git-gui) are now in the 'git-gui' formula.<br>
  Subversion interoperability (git-svn) is now in the 'git-svn' formula.<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/blobs/sha256:7a3b5f75ca44d330e0f37432af09f58e37bfa873f25d340dece3c3e6c7927657<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/manifests/1.27.3-1<br>
  ==> <strong>Fetching </strong>nginx<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:a522ff78dbf7156230cac0fe298d93fc7fc841650290722caf435513c15476be<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/manifests/23.3.0<br>
  ==> <strong>Fetching </strong>node<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/blobs/sha256:28a491eda835e37fed1f69d12c5967d86c25d5e8aa43c4c5664c6f042d8f6fa7<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/manifests/3.11.11<br>
  ==> <strong>Fetching </strong><strong>smart.phonics</strong>@3.11<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/blobs/sha256:ee9aaacdb633337b49e6294d76317bcbfbab475b6f220f2ee62e67353250c8a6<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/manifests/0.3.46<br>
  ==> <strong>Fetching </strong><strong>flyctl</strong><br>
  Docroot is: /usr/local/var/www<br>
  The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that<br>
  nginx can run without sudo.<br>
  nginx will load all files in /usr/local/etc/nginx/servers/.<br>
  To start nginx now and restart at login:<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/blobs/sha256:3b7de3da2e6243d4af5035bce6f93055e4883f2277ae7c8722c149f8c45f4b72<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/manifests/2.47.1<br>
  ==> <strong>Fetching </strong>git<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/blobs/sha256:aaa8aee7e2147287d742c407139fad74126ef2d97fc13655657f9bd511b1c818<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/manifests/3.47.1<br>
  ==> <strong>Fetching </strong><strong>sqlite</strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>sqlite</strong>/blobs/sha256:3ec83a8caed77476623d709d6d980698f09c0fb267907a2bf8323e6fc5b8439b<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>micro<strong>smart.phonics</strong></strong>/manifests/1.24.1<br>
  ==> <strong>Fetching </strong><strong>micro<strong>smart.phonics</strong></strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>micro<strong>smart.phonics</strong></strong>/blobs/sha256:6601736a89957321cdb26111f3d6da67575ee7a5324b1af791cf2370240b259b<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/manifests/2024-11-26<br>
  ==> <strong>Fetching </strong>ca-certificates<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/ca-certificates/blobs/sha256:7a3b5f75ca44d330e0f37432af09f58e37bfa873f25d340dece3c3e6c7927657<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/manifests/1.27.3-1<br>
    3.47.0 -> 3.47.1 <br>
  ==> Pouring <strong>sqlite</strong>--3.47.1.ventura.bottle.tar.gz<br>
    /usr/local/Cellar/<strong>sqlite</strong>/3.47.1: 12 files, 4.9MB<br>
  ==> Running 'brew cleanup <strong>sqlite</strong>'...<br>
  Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.<br>
  Hide these hints with HOMEBREW_NO_ENV_HINTS (see 'man brew').<br>
  <strong>Removing: </strong>/usr/local/Cellar/<strong>sqlite</strong>/3.47.0... (12 files, 4.9MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>sqlite</strong>_bottle_manifest--3.47.0... (9.4KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>sqlite</strong>--3.47.0... (2.3MB)<br>
  ==> <strong>Upgrading </strong><strong>micro<strong>smart.phonics</strong></strong><br>
    1.24.0 -> 1.24.1 <br>
  ==> Pouring <strong>micro<strong>smart.phonics</strong></strong>--1.24.1.ventura.bottle.tar.gz<br>
    /usr/local/Cellar/<strong>micro<strong>smart.phonics</strong></strong>/1.24.1: 7 files, 1MB<br>
  ==> Running 'brew cleanup <strong>micro<strong>smart.phonics</strong></strong>'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/<strong>micro<strong>smart.phonics</strong></strong>/1.24.0... (7 files, 1MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>micro<strong>smart.phonics</strong></strong>_bottle_manifest--1.24.0... (9.5KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>micro<strong>smart.phonics</strong></strong>--1.24.0... (492.2KB)<br>
  ==> <strong>Upgrading </strong>ca-certificates<br>
    2024-09-24 -> 2024-11-26 <br>
  ==> Pouring ca-certificates--2024-11-26.all.bottle.tar.gz<br>
  ==> Regenerating CA certificate bundle from keychain, this may take a while...<br>
    /usr/local/Cellar/ca-certificates/2024-11-26: 4 files, 239.4KB<br>
  ==> Running 'brew cleanup ca-certificates'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/ca-certificates/2024-09-24... (4 files, 237.4KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates_bottle_manifest--2024-09-24... (1.9KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/ca-certificates--2024-09-24... (132.6KB)<br>
  ==> <strong>Upgrading </strong>nginx<br>
    1.27.2 -> 1.27.3 <br>
  ==> Pouring nginx--1.27.3.ventura.bottle.1.tar.gz<br>
  ==> Caveats<br>
  Docroot is: /usr/local/var/www<br>
  The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that<br>
  nginx can run without sudo.<br>
  nginx will load all files in /usr/local/etc/nginx/servers/.<br>
  To start nginx now and restart at login:<br>
    brew services start nginx<br>
  Or, if you don't want/need a background service you can just run:<br>
    /usr/local/opt/nginx/bin/nginx -g daemon\ off\;<br>
  ==> Summary<br>
    /usr/local/Cellar/nginx/1.27.3: 27 files, 2.5MB<br>
  ==> Running 'brew cleanup nginx'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/nginx/1.27.2... (27 files, 2.5MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx_bottle_manifest--1.27.2... (10KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/nginx--1.27.2... (1.4MB)<br>
  ==> <strong>Upgrading </strong>node<br>
    23.2.0_1 -> 23.3.0 <br>
  ==> Pouring node--23.3.0.ventura.bottle.tar.gz<br>
  /usr/local/Cellar/node/23.3.0: 2,676 files, 88.2MB<br>
  ==> Running 'brew cleanup node'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/node/23.2.0_1... (2,676 files, 88.2MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node_bottle_manifest--23.2.0_1... (16.2KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/node--23.2.0_1... (21.1MB)<br>
  ==> <strong>Upgrading </strong><strong>smart.phonics</strong>@3.11<br>
    3.11.10 -> 3.11.11 <br>
  ==> Pouring <strong>smart.phonics</strong>@3.11--3.11.11.ventura.bottle.tar.gz<br>
  ==> /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11/bin/<strong>smart.phonics</strong>3.11 -Im ensurepip<br>
  ==> /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11/bin/<strong>smart.phonics</strong>3.11 -Im pip <strong>install </strong>-v --no-index --upgrade --isolated --target=/usr/local/lib/<strong>smart.phonics</strong>3.11/site-<br>
  ==> Caveats<br>
  <strong>smart.phonics</strong> is installed as<br>
    /usr/local/bin/<strong>smart.phonics</strong>3.11<br>
  Unversioned and major-versioned symlinks '<strong>smart.phonics</strong>', '<strong>smart.phonics</strong>3', '<strong>smart.phonics</strong>-config', '<strong>smart.phonics</strong>3-config', 'pip', 'pip3', etc. pointing to<br>
  '<strong>smart.phonics</strong>3.11', '<strong>smart.phonics</strong>3.11-config', 'pip3.11' etc., respectively, are installed into<br>
    /usr/local/opt/<strong>smart.phonics</strong>@3.11/libexec/bin<br>
  You can <strong>install </strong><strong>smart.phonics</strong> packages with<br>
    pip3.11 <strong>install </strong><package><br>
  They will <strong>install </strong>into the site-package directory<br>
    /usr/local/lib/<strong>smart.phonics</strong>3.11/site-packages<br>
  tkinter is no longer included with this formula, but it is available separately:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>-tk@3.11<br>
  gdbm ('dbm.gnu') is no longer included in this formula, but it is available separately:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>-gdbm@3.11<br>
  'dbm.ndbm' changed database backends in Homebrew <strong>smart.phonics</strong> 3.11.<br>
  If you need to read a database from a previous Homebrew <strong>smart.phonics</strong> created via 'dbm.ndbm',<br>
  you'll need to read your database using the older version of Homebrew <strong>smart.phonics</strong> and convert to another format.<br>
  'dbm' still defaults to 'dbm.gnu' when it is installed.<br>
  If you do not need a specific version of <strong>smart.phonics</strong>, and always want Homebrew's '<strong>smart.phonics</strong>3' in your PATH:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>3<br>
  For more information about Homebrew and <strong>smart.phonics</strong>, see: https://docs.brew.sh/Homebrew-and-<strong>smart.phonics</strong><br>
  ==> Summary<br>
  /usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.11: 3,304 files, 61.3MB<br>
  ==> Running 'brew cleanup <strong>smart.phonics</strong>@3.11'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/<strong>smart.phonics</strong>@3.11/3.11.10... (3,304 files, 61.3MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>smart.phonics</strong>@3.11_bottle_manifest--3.11.10... (28.2KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>smart.phonics</strong>@3.11--3.11.10... (15MB)<br>
  ==> <strong>Upgrading </strong><strong>flyctl</strong><br>
    0.3.39 -> 0.3.46 <br>
  ==> Pouring <strong>flyctl</strong>--0.3.46.ventura.bottle.tar.gz<br>
  ==> Caveats<br>
  zsh completions have been installed to:<br>
    /usr/local/share/zsh/site-functions<br>
  ==> Summary<br>
  /usr/local/Cellar/<strong>flyctl</strong>/0.3.46: 13 files, 62.7MB<br>
  ==> Running 'brew cleanup <strong>flyctl</strong>'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/<strong>flyctl</strong>/0.3.39... (13 files, 62.9MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>flyctl</strong>_bottle_manifest--0.3.39... (7.2KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/<strong>flyctl</strong>--0.3.39... (20.9MB)<br>
  ==> <strong>Upgrading </strong>git<br>
    2.47.0 -> 2.47.1 <br>
  ==> Pouring git--2.47.1.ventura.bottle.tar.gz<br>
  ==> Caveats<br>
  The Tcl/Tk GUIs (e.g. gitk, git-gui) are now in the 'git-gui' formula.<br>
  Subversion interoperability (git-svn) is now in the 'git-svn' formula.<br>
  zsh completions and functions have been installed to:<br>
    /usr/local/share/zsh/site-functions<br>
  ==> <strong>Fetching </strong>nginx<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/nginx/blobs/sha256:a522ff78dbf7156230cac0fe298d93fc7fc841650290722caf435513c15476be<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/manifests/23.3.0<br>
  ==> <strong>Fetching </strong>node<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/node/blobs/sha256:28a491eda835e37fed1f69d12c5967d86c25d5e8aa43c4c5664c6f042d8f6fa7<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/manifests/3.11.11<br>
  ==> <strong>Fetching </strong><strong>smart.phonics</strong>@3.11<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>smart.phonics</strong>/3.11/blobs/sha256:ee9aaacdb633337b49e6294d76317bcbfbab475b6f220f2ee62e67353250c8a6<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/manifests/0.3.46<br>
  ==> <strong>Fetching </strong><strong>flyctl</strong><br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/<strong>flyctl</strong>/blobs/sha256:3b7de3da2e6243d4af5035bce6f93055e4883f2277ae7c8722c149f8c45f4b72<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/manifests/2.47.1<br>
  ==> <strong>Fetching </strong>git<br>
  ==> <strong>Downloading</strong> https://ghcr.io/v2/homebrew/core/git/blobs/sha256:aaa8aee7e2147287d742c407139fad74126ef2d97fc13655657f9bd511b1c818<br>
  ==> <strong>Upgrading </strong><strong>sqlite</strong><br>
  ==> Summary<br>
  /usr/local/Cellar/git/2.47.1: 1,685 files, 54.6MB<br>
  ==> Running 'brew cleanup git'...<br>
  <strong>Removing: </strong>/usr/local/Cellar/git/2.47.0... (1,684 files, 54.6MB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/git_bottle_manifest--2.47.0... (14.2KB)<br>
  <strong>Removing: </strong>/Users/smart.phonics/Library/Caches/Homebrew/git--2.47.0... (19.9MB)<br>
  ==> Caveats<br>
  ==> nginx<br>
  Docroot is: /usr/local/var/www<br>
  The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that<br>
  nginx can run without sudo.<br>
  nginx will load all files in /usr/local/etc/nginx/servers/.<br>
  To start nginx now and restart at login:<br>
    brew services start nginx<br>
  Or, if you don't want/need a background service you can just run:<br>
    /usr/local/opt/nginx/bin/nginx -g daemon\ off\;<br>
  ==> <strong>smart.phonics</strong>@3.11<br>
  <strong>smart.phonics</strong> is installed as<br>
    /usr/local/bin/<strong>smart.phonics</strong>3.11<br>
  Unversioned and major-versioned symlinks '<strong>smart.phonics</strong>', '<strong>smart.phonics</strong>3', '<strong>smart.phonics</strong>-config', '<strong>smart.phonics</strong>3-config', 'pip', 'pip3', etc. pointing to<br>
  '<strong>smart.phonics</strong>3.11', '<strong>smart.phonics</strong>3.11-config', 'pip3.11' etc., respectively, are installed into<br>
    /usr/local/opt/<strong>smart.phonics</strong>@3.11/libexec/bin<br>
  You can <strong>install </strong><strong>smart.phonics</strong> packages with<br>
    pip3.11 <strong>install </strong><package><br>
  They will <strong>install </strong>into the site-package directory<br>
    /usr/local/lib/<strong>smart.phonics</strong>3.11/site-packages<br>
  tkinter is no longer included with this formula, but it is available separately:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>-tk@3.11<br>
  gdbm ('dbm.gnu') is no longer included in this formula, but it is available separately:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>-gdbm@3.11<br>
  'dbm.ndbm' changed database backends in Homebrew <strong>smart.phonics</strong> 3.11.<br>
  If you need to read a database from a previous Homebrew <strong>smart.phonics</strong> created via 'dbm.ndbm',<br>
  you'll need to read your database using the older version of Homebrew <strong>smart.phonics</strong> and convert to another format.<br>
  'dbm' still defaults to 'dbm.gnu' when it is installed.<br>
  If you do not need a specific version of <strong>smart.phonics</strong>, and always want Homebrew's '<strong>smart.phonics</strong>3' in your PATH:<br>
    brew <strong>install </strong><strong>smart.phonics</strong>3<br>
  For more information about Homebrew and <strong>smart.phonics</strong>, see: https://docs.brew.sh/Homebrew-and-<strong>smart.phonics</strong><br>
  ==> <strong>smart.phonics</strong><br>
  zsh completions have been installed to:<br>
    /usr/local/share/zsh/site-functions<br>
  ==> <strong>git</strong><br>
  The Tcl/Tk GUIs (e.g. gitk, git-gui) are now in the 'git-gui' formula.<br>
  Subversion interoperability (git-svn) is now in the 'git-svn' formula.<br>
  zsh completions and functions have been installed to:<br>
  /usr/local/Cellar/git/2.47.1: 1,685 files, 54.6MB Subversion interoperability<br>;`;
  return hack;
}

function setHack2() {
  const hack: string = `
<br><br>
<br><br>
<strong>SMART.PHONICS</strong><br>
⠀⠀⠀⠀⠀⠀⠀<strong>Nicolas CANOT</strong> - DJing<br>
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<strong>Romain AL.</strong> - VJing<br>
<br>
<br>
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣶⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣤⣤⣄⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡿⠟⠋⠁⠀⠀⠀⠀⠀⠈⠉⠛⠦⣄⡀⠀⠀⠀⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⠀⠀⠀⢠⡼⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢦⣶⣶⣶⣦⣄⠀<br>
⠀⠀⠀⠀⠀⠀⠀⢠⡟⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣿⣦<br>
⠀⢀⣀⣀⡀⠀⠀⡿⠀⠀⢀⣴⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⡟<br>
⢀⣿⣿⣿⣿⣦⣄⡇⠈⠋⢸⣿⣿⣯⣼⠏⠀⠀⠀⠀⠀⢀⣰⣦⣄⠀⠀⠀⠀⢹⡿⠋⠀<br>
⠈⣿⣿⣿⣿⣿⣿⣿⠀⠀⢀⣙⠛⠛⠁⠀⠀⣦⣤⡀⠀⣾⡟⣿⣿⣷⠀⠀⠀⢸⠂⠀⠀<br>
⠀⠹⣿⣿⣿⣿⣿⣿⣧⡀⠉⠁⠀⠀⠀⠻⣤⣿⣉⣩⠀⠹⣷⣿⣿⡿⠀⠀⠀⣼⠀⠀⠀<br>
⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣶⣄⡀⠀⠀⠀⠀⠈⠉⠁⠀⠀⢨⡉⠉⠀⢸⠀⣼⠃⠀⠀⠀<br>
⠀⠀⠀⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⣀⠀⠀⠀⠀⠀⠀⠑⠆⠀⣠⡾⠁⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⠙⡟⠛⠻⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣿⣏⠁⠀⠀⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⢰⠃⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⢸⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⠈⣿⣿⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⣿⠈⠙⠛⠉⠀⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⡗⠒⠶⠤⠤⣶⣶⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀<br>
⠀⠀⠀⠀⠀⠀⠀⠙⠿⠿⠿⠃⠀⠀⠀⠀⠀⠀⠙⠿⠿⠟⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br>
<br>
<br>
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<strong>Disable this behaviour</strong><br>
⠀⠀⠀⠀⠀⠀⠀Subversion interoperability
<br>
<br>
<br>
<br>
<br>
undefined<br>
undefined<br>`;
  return hack;
}
