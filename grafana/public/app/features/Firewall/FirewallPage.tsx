import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useMount } from 'react-use';
import { NavModel } from '@grafana/data';
import { VerticalGroup } from '@grafana/ui';

import { getNavModel } from 'app/core/selectors/navModel';
import { StoreState } from 'app/types';
import Page from 'app/core/components/Page/Page';
import { initUserProfilePage } from '../profile/state/actions';
import FirewallCreate from 'app/core/components/Firewall/FirewallCreate';

export interface OwnProps {
  navModel: NavModel;
}

function mapStateToProps(state: StoreState) {
  return {
    navModel: getNavModel(state.navIndex, 'firewall-rules')
  };
}

const mapDispatchToProps = {
  initUserProfilePage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type Props = OwnProps & ConnectedProps<typeof connector>;

export function FirewallPage({
  navModel, initUserProfilePage,
}: Props) {
  useMount(() => initUserProfilePage());

  return (
    <Page navModel={navModel}>
      <Page.Contents>
        <VerticalGroup spacing="md">
          <FirewallCreate />
        </VerticalGroup>
      </Page.Contents>
    </Page>
  );
}

export default connector(FirewallPage);
