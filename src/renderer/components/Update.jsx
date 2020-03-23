import React from 'react'
import useSWR from 'swr'
import pkg from '../../../package.json'
import { openUrl, fetchData } from '../../utils'
import styles from './Update.module.css'

export default function Update() {
  const url =
    'https://api.github.com/repos/kremalicious/blowfish/releases/latest'
  const { data } = useSWR(url, fetchData)

  if (!data || !data.tag_name) return null

  const hasUpdate = data.tag_name !== `v${pkg.version}`

  return hasUpdate ? (
    <a
      onClick={() =>
        openUrl('https://github.com/kremalicious/blowfish/releases')
      }
      className={styles.update}
    >
      Update available
    </a>
  ) : null
}
