import { type ReactElement } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components';
import { PUBLIC_SITE_ORIGIN } from '@/constants/publicSite';
import type { Palette } from '@/theme';

export type LegalDocument = 'terms' | 'privacy';

type LegalModalProps = {
  visible: boolean;
  document: LegalDocument;
  palette: Palette;
  onClose: () => void;
};

const LEGAL_COPY: Record<
  LegalDocument,
  { title: string; body: string }
> = {
  terms: {
    title: '利用規約',
    body: `デートベースはデートスポットの検索と保存のためのアプリです。掲載情報は参考情報で、席の予約は受け付けません。有料プランの決済も現在はありません。全文は ${PUBLIC_SITE_ORIGIN}/terms です。`,
  },
  privacy: {
    title: 'プライバシーポリシー',
    body: `位置情報、メールアドレス、お気に入り、プラン、口コミ、クーポン利用履歴を、アプリの機能のために扱います。個人情報の販売と広告追跡はしません。全文は ${PUBLIC_SITE_ORIGIN}/privacy です。`,
  },
};

export function LegalModal({
  visible,
  document,
  palette,
  onClose,
}: LegalModalProps): ReactElement {
  const copy = LEGAL_COPY[document];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View
          style={[
            styles.card,
            { backgroundColor: palette.surface, borderColor: palette.border },
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: palette.text }]}>
              {copy.title}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="閉じる"
              onPress={onClose}
            >
              <Ionicons name="close" size={20} color={palette.text} />
            </Pressable>
          </View>
          <ScrollView style={styles.scroll}>
            <Text style={[styles.body, { color: palette.textSecondary }]}>
              {copy.body}
            </Text>
          </ScrollView>
          <Button label="閉じる" palette={palette} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43, 29, 31, 0.45)',
  },
  card: {
    maxHeight: '70%',
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  scroll: {
    flexGrow: 0,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
  },
});
