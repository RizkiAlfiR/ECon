import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Login from './app/Halaman/Login';
import Beranda from './app/Halaman/Beranda';
import Pengajuan from './app/Halaman/Pengajuan';
import Daerah from './app/Halaman/Daerah';
import Akun from './app/Halaman/Akun';

export default createStackNavigator({
  Login: Login,
  Beranda: Beranda,
  Pengajuan: Pengajuan,
  Daerah: Daerah,
  Akun: Akun
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
