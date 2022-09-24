import { useNavigation, useRoute } from '@react-navigation/native';
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../../components/Background';
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { GameParams } from '../../@types/@navigation'
import { THEME } from '../../theme';
import { Header } from '../../components/Header';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';

export function Game() {

    const [duos, setDuos] = useState<DuoCardProps[]>([])

    const navigation = useNavigation()
    const route = useRoute()
    const game = route.params as GameParams
  
    function handleGoBack() {
      navigation.goBack()
    }

    useEffect(() => {
      fetch(`http://192.168.0.106:3000/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
    }, [])

    
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
              onPress={handleGoBack}
            />
          </TouchableOpacity>
          <Image 
            source={logoImg}  
            style={styles.logo}    
          />
          <View style={styles.right}/>
        </View>

        <Image 
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="contain"
        />
        <Header 
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />
        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
          <DuoCard 
            data={item}
            onConnect={() => {}}
            />
          )}
          horizontal
          contentContainerStyle={duos.length ? styles.contentList : styles.emptyListContent}
          showsHorizontalScrollIndicator
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para esse jogo ainda.
            </Text>
          )}
        />
        
      </SafeAreaView>
    </Background>
  );
}