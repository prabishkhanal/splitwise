import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '@/constants/theme';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types';

// Mock contacts for demo
const mockContacts: User[] = [
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com' },
  { id: '5', name: 'Tom Brown', email: 'tom@example.com' },
];

export default function AddGroupScreen() {
  const { user } = useAuth();
  const { createGroup } = useApp();

  const [name, setName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddMember = (member: User) => {
    if (!selectedMembers.find(m => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== memberId));
  };

  const filteredContacts = mockContacts.filter(
    contact =>
      !selectedMembers.find(m => m.id === contact.id) &&
      (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateGroup = async () => {
    if (!user || !name || selectedMembers.length === 0) return;

    try {
      // Add current user to the group members
      const allMembers = [user, ...selectedMembers];
      await createGroup(name, allMembers);
      router.back();
    } catch (error) {
      console.error('Error creating group:', error);
      // TODO: Show error message
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        {/* Group Info */}
        <Card variant="elevated" style={styles.card}>
          <Input
            label="Group Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter group name"
          />

          {/* Selected Members */}
          {selectedMembers.length > 0 && (
            <View style={styles.selectedMembers}>
              <Text style={styles.label}>Selected Members</Text>
              {selectedMembers.map(member => (
                <View key={member.id} style={styles.memberItem}>
                  <View style={styles.memberInfo}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {member.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.memberText}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <Text style={styles.memberEmail}>{member.email}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveMember(member.id)}
                    style={styles.removeButton}
                  >
                    <FontAwesome name="times" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Card>

        {/* Add Members */}
        <Card variant="elevated" style={styles.card}>
          <Text style={styles.cardTitle}>Add Members</Text>
          <Input
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search contacts"
            style={styles.searchInput}
          />

          <View style={styles.contactsList}>
            {filteredContacts.map(contact => (
              <TouchableOpacity
                key={contact.id}
                style={styles.contactItem}
                onPress={() => handleAddMember(contact)}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {contact.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactEmail}>{contact.email}</Text>
                </View>
                <FontAwesome
                  name="plus-circle"
                  size={24}
                  color={COLORS.primary}
                  style={styles.addIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.footer}>
        <Button
          title="Create Group"
          onPress={handleCreateGroup}
          disabled={!name || selectedMembers.length === 0}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: SIZES.md,
  },
  label: {
    fontSize: SIZES.body2,
    color: COLORS.textSecondary,
    fontFamily: FONTS.medium,
    marginBottom: SIZES.sm,
  },
  selectedMembers: {
    marginTop: SIZES.md,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.white,
    fontSize: SIZES.body1,
    fontFamily: FONTS.bold,
  },
  memberText: {
    marginLeft: SIZES.sm,
    flex: 1,
  },
  memberName: {
    fontSize: SIZES.body2,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
  },
  memberEmail: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  removeButton: {
    padding: SIZES.xs,
  },
  cardTitle: {
    fontSize: SIZES.body1,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
    marginBottom: SIZES.md,
  },
  searchInput: {
    marginBottom: SIZES.md,
  },
  contactsList: {
    marginTop: SIZES.xs,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  contactInfo: {
    flex: 1,
    marginLeft: SIZES.sm,
  },
  contactName: {
    fontSize: SIZES.body2,
    color: COLORS.textPrimary,
    fontFamily: FONTS.medium,
  },
  contactEmail: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
  },
  addIcon: {
    marginLeft: SIZES.sm,
  },
  footer: {
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
