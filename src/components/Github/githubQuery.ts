export const githubQuery = `
query Contributions($userName:String!) { 
  user(login: $userName) {
    avatarUrl(size: 48)
    company
    url
    location
    name
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;
