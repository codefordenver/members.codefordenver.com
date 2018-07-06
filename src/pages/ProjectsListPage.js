import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import LoadingIndicator from '../sections/LoadingIndicator';
import ProjectSideBar from '../sections/ProjectSidebar';

const ProjectsList = ({ projects, loading }) => {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (!projects.length) {
    return <p>No projects yet</p>;
  }

  return <ProjectSideBar projects={projects} />;
};

ProjectsList.defaultProps = {
  projects: []
};

/* eslint-disable graphql/template-strings */
const allProjectsQuery = gql`
  query projects {
    projects
      @rest(
        type: "Projects"
        path: "orgs/codefordenver/repos"
        endpoint: "github"
      ) {
      id
      name
    }
  }
`;
/* eslint-enable graphql/template-strings */

const ProjectsListPage = graphql(allProjectsQuery, {
  options: () => ({}),
  props: ({ data: { projects, loading } }) => ({
    projects,
    loading
  })
})(ProjectsList);

export default ProjectsListPage;
