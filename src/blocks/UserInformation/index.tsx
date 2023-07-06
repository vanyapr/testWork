import React, {ReactElement} from "react";
import {IUserInfoProps} from "@interface/IUserInfoProps";
import styles from './userinformation.module.scss'

export default function UserInformation({userData}: IUserInfoProps): ReactElement {
  return (
    <table className={styles.table}>
      <thead>
      <tr>
        <th className={styles.td}>Username</th>
        <th className={styles.td}>Phone number</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td className={styles.td}>{userData?.name}</td>
        <td className={styles.td}>{userData?.phone}</td>
      </tr>
      </tbody>
    </table>
  );
}
