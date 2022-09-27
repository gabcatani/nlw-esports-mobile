import React, { useState } from 'react';
import { View, Text, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Header } from '../Header';

interface Props extends ModalProps {
    discord: string
    onClose: () => void
}

export function DuoMatch({discord, onClose, ...rest}: Props) {

    const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert('Discord Copiado!', 'Usuário copiado :D')
    setIsCopping(false);
  };

  return (
    <Modal
        animationType='fade'
        transparent
        statusBarTranslucent
        {...rest}
    >
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity 
                    style={styles.closeIcon}
                    onPress={onClose}
                >
                    <MaterialIcons 
                        name="close"
                        size={20}
                        color={THEME.COLORS.CAPTION_500}
                    />
                </TouchableOpacity>

                <CheckCircle 
                    size={64}
                    color={THEME.COLORS.SUCCESS}
                    weight="bold"
                />

                <Header 
                    title="Let's Play!"
                    subtitle='Agora é só começar a jogar.'
                    style={{ alignItems: 'center', marginTop: 24 }}
                />
                
                <Text style={styles.label}>
                    Adicione no Discord
                 </Text>

                <TouchableOpacity
                    style={styles.discordButton}
                    activeOpacity={0.7}
                    disabled={isCopping}
                    onPress={handleCopyDiscordToClipboard}
                >
                    <Text style={styles.discord}>
                    {
                        isCopping
                        ? <ActivityIndicator color={THEME.COLORS.PRIMARY} />
                        : discord
                    }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  );
}