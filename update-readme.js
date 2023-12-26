const { Octokit } = require('octokit');
const fs = require('fs');

const octokit = new Octokit({
  auth: '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',

const octokit = new Octokit({
  auth: githubToken,
});

async function updateReadme() {
  try {
    const { data: repos } = await octokit.repos.listForUser({
      username: 'MuthuvelA', 
    });

    // Calculate language statistics here...
    const languageStats = repos.reduce((stats, repo) => {
      repo.language && (stats[repo.language] = (stats[repo.language] || 0) + 1);
      return stats;
    }, {});

    const sortedLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .map(([language]) => language);

    const topLanguages = sortedLanguages.slice(0, 5).join(', ');

    const readmeContent = `![Muthuvel's GitHub stats](https://github-readme-stats.vercel.app/api?username=muthuvela&show_icons=true&count_private=true)\n\n[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=muthuvela&layout=compact)](https://github.com/muthuvela/github-readme-stats)\n\n**Most Used Languages:** ${topLanguages}`;

    fs.writeFileSync('README.md', readmeContent);
  } catch (error) {
    console.error('Error updating README:', error.message);
  }
}

updateReadme();
