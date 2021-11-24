import React, { FC, useState } from 'react';
import { Button, ConfirmModal } from '@grafana/ui';

interface Props {
  onDelete: (orgId: number) => void;
}

const rules = [
  {id:1,rule:'Reject',source:'10.0.0.1'},
  {id:3,rule:'Reject',source:'10.0.0.1'},
  {id:4,rule:'Reject',source:'10.0.0.1'},
]

export const AdminOrgsTable: FC<Props> = ({ onDelete }) => {
  const [deleteOrg, setDeleteOrg] = useState();
  return (
    <table className="filter-table form-inline filter-table--hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type Rule</th>
          <th>IP/PORT</th>
          <th style={{ width: '1%' }}></th>
        </tr>
      </thead>
      <tbody>
        {rules.map((rule) => (
          <tr key={`${rule.id}`}>
            <td className="link-td">
              <p>{rule.id}</p>
            </td>
            <td className="link-td">
              <p>{rule.rule}</p>
            </td>
            <td className="link-td">
              <p>{rule.source}</p>
            </td>
            <td className="text-right">
              <Button
                variant="destructive"
                size="sm"
                icon="times"
                onClick={() => setDeleteOrg(rule)}
                aria-label="Delete Rule"
              />
            </td>
          </tr>
        ))}
      </tbody>
      {deleteOrg && (
        <ConfirmModal
          isOpen
          icon="trash-alt"
          title="Delete"
          body={
            <div>
              Are you sure you want to delete &apos;{deleteOrg.name}&apos;?
              <br /> <small>All dashboards for this organization will be removed!</small>
            </div>
          }
          confirmText="Delete"
          onDismiss={() => setDeleteOrg(undefined)}
          onConfirm={() => {
            onDelete(deleteOrg.id);
            setDeleteOrg(undefined);
          }}
        />
      )}
    </table>
  );
};
