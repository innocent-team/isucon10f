#!/usr/bin/perl
use strict;
use warnings;

sub get_gitignore {
  my ($lang, $langdir, $url) = @_;

  my $content = `curl -sS $url`;

  # Perlの場合はlocal/もignoreする
  if ($lang eq 'Perl') {
    $content .= "local/\n"
  }
  # Goの場合はvendor/もignoreする
  if ($lang eq 'Go') {
    $content .= "vendor/\n"
  }

  open my $out, ">", "$langdir/.gitignore" or do {
    warn "Cannot open $langdir/.gitignore: $!";
    return;
  };
  $out->print('#' x 80 . "\n");
  $out->print("# $lang\n");
  $out->print("# from: $url\n");
  $out->print('#' x 80 . "\n");
  $out->print($content);
  close $out;
  print "saved in $langdir/.gitignore\n";
}

sub check_curl_command_available {
  system('which curl') == 0;
}

sub main {
  unless (check_curl_command_available()) {
    warn 'Please install `curl` command at first';
    exit 1;
  }

  my %langs = (
    Go => 'golang',
    Perl => 'perl',
    Ruby => 'ruby',
    Node => 'nodejs',
    Python => 'python',
    Rust => 'rust',
  );

  my $github_base_url = 'https://raw.githubusercontent.com/github/gitignore/master';

  foreach my $lang (sort keys %langs) {
    my $url = "$github_base_url/$lang.gitignore";
    get_gitignore $lang, $langs{$lang}, $url;
  }

  # PHPのgitignoreを入れる
  # PHP.gitignore はGitHubにないので別で対処する
  my $url = 'https://gist.githubusercontent.com/mrclay/3100456/raw/bad04e6bfef738d58134ce4256f3ae9ee22adbbb/.gitignore';
  get_gitignore 'PHP', 'php', $url;
}

main();

__END__

=head1 NAME

serve-gitignore.pl - 各言語の.gitignoreを一気にサーブする

=head1 SYNOPSIS

各言語実装のディレクトリが置いてあるディレクトリ (ISUCON8予選なら torb/webapp/)にこのスクリプトを置いて実行すると、各言語実装のディレクトリに.gitignoreが配置される

=cut
