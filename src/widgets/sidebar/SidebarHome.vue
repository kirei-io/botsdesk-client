<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useBusinessStore } from '@/entities/customer'
import { useTagStore } from '@/entities/customer'
import { ROUTE_NAME } from '@/shared/config'
import { ButtonFlat, ButtonRaised, FormLayout, InputText } from '@/shared/ui'

import { ModalDefault } from '../modal'
import NavLink from './ui/NavLink.vue'

const store = useBusinessStore()
const tag = useTagStore()
const route = useRoute()
const selectedBusiness = computed(() => String(route.params.business_id))
const isBusinessRoute = computed(() => route.params.business_id)

const isCreateOpen = ref(false)
const isRemoveOpen = ref(false)
const createTagName = ref('')
const isValidationCreateTag = ref(false)
const removeTagId = ref<string | null>(null)

watch(selectedBusiness, () => {
  if (selectedBusiness.value) {
    if (isBusinessRoute.value) {
      tag.onListTags(selectedBusiness.value)
    } else {
      tag.$reset()
    }
  }
})

const selectTag = (tag_id?: string) => {
  if (tag_id) {
    if (tag.selectedTag.has(tag_id)) {
      tag.selectedTag.delete(tag_id)
    } else {
      tag.selectedTag.add(tag_id)
    }
  } else {
    tag.selectedTag.clear()
  }
}

const isSelectedTag = (tag_id: string) => {
  return tag.selectedTag.has(tag_id)
}

const createTagModalOpen = () => {
  isCreateOpen.value = true
}

const removeTagModalOpen = (tag_id: string) => {
  removeTagId.value = tag_id
  isRemoveOpen.value = true
}

const createTag = async () => {
  if (createTagName.value) {
    await tag.onCreateTag(selectedBusiness.value, createTagName.value)
    tag.$reset()
    await tag.onListTags(selectedBusiness.value)
    isCreateOpen.value = false
  } else {
    isValidationCreateTag.value = true
  }
}

const removeTag = async () => {
  if (removeTagId.value) {
    tag.$reset()
    await tag.onRemoveTag(selectedBusiness.value, removeTagId.value)
    tag.$reset()

    await tag.onListTags(selectedBusiness.value)
  }
  removeTagId.value = null
  isRemoveOpen.value = false
}

onMounted(async () => {
  store.onListBusinesses()
  if (isBusinessRoute.value) {
    tag.onListTags(selectedBusiness.value)
  }
})
</script>

<template>
  <nav
    class="flex min-h-screen w-1/6 flex-col gap-2 bg-ctp-mantle px-2 py-4 shadow-lg"
  >
    <NavLink
      :to="{ name: ROUTE_NAME.HOME }"
      :icon="['fas', 'home']"
      label="Home"
      class="mb-2"
    />
    <div
      v-for="([business_id, business], index) of store.businessMap"
      :key="index"
      class="mb-2 flex flex-col"
    >
      <NavLink
        :icon="['fas', 'angle-right']"
        :to="{
          name: ROUTE_NAME.ARTICLE_LIST,
          params: {
            business_id
          }
        }"
        :label="business.name"
        :language="business.language"
        :is-selected="selectedBusiness === business_id"
        @click="() => selectTag()"
      />
      <div>
        <div
          v-if="selectedBusiness === business_id"
          class="flex flex-col gap-2"
        >
          <ButtonFlat
            class="ml-8 text-left"
            @click="() => createTagModalOpen()"
          >
            <FontAwesomeIcon
              :icon="['fas', 'plus']"
              class="mr-2 text-sm"
            />
            Add one
          </ButtonFlat>
          <ButtonFlat
            v-for="(tagItem, index) of tag.listTags?.items"
            :key="index"
            :class="{
              'bg-ctp-crust': isSelectedTag(String(tagItem.tag_id)),
              'hover:bg-ctp-base': isSelectedTag(String(tagItem.tag_id))
            }"
            @click="() => selectTag(String(tagItem.tag_id))"
            class="ml-8 flex items-center justify-between text-left"
          >
            {{ tagItem.name }}
            <ButtonFlat
              @click.stop.prevent="() => removeTagModalOpen(String(tagItem.tag_id))"
              :class="{
                '!text-ctp-overlay1': isSelectedTag(String(tagItem.tag_id)),
                'hover:!text-ctp-overlay1': isSelectedTag(String(tagItem.tag_id)),
                'pointer-events-none': isSelectedTag(String(tagItem.tag_id))
              }"
              class="!bg-transparent px-4 text-sm hover:!text-ctp-maroon"
            >
              <FontAwesomeIcon :icon="['fas', 'trash']" />
            </ButtonFlat>
          </ButtonFlat>
        </div>
      </div>
    </div>
    <ModalDefault
      :is-open="isCreateOpen"
      @close="() => (isCreateOpen = false)"
      modal-class="py-8 px-12"
    >
      <h3
        class="mb-6 border-b border-ctp-surface0 pb-2 text-xl font-semibold text-ctp-subtext0"
      >
        Create a new tag
      </h3>

      <FormLayout
        id="form-create-tag"
        @submit.prevent="() => createTag()"
      >
        <InputText
          v-model:value="createTagName"
          :is-valid="isValidationCreateTag"
          name="create-tag"
          label="Tag name"
          placeholder="Enter a new tag name"
          validation-mesage="Field cannot be empty"
        />
        <div class="mt-6 flex justify-end gap-4">
          <ButtonRaised form="form-create-tag">Create</ButtonRaised>
          <ButtonRaised @click.prevent="() => (isCreateOpen = false)"> Cancel
          </ButtonRaised>
        </div>
    </FormLayout>
  </ModalDefault>

  <ModalDefault
    :is-open="isRemoveOpen"
    @close="() => (isRemoveOpen = false)"
    modal-class="py-8 px-12"
  >
    <h3
      class="mb-6 border-b border-ctp-surface0 pb-2 text-xl font-semibold text-ctp-subtext0"
    >
      Do you really want to remove the tag?
    </h3>
    <FormLayout
      id="form-remove-tag"
      @submit.prevent="() => removeTag()"
    >
      <div class="flex justify-end gap-4">
        <ButtonRaised form="form-remove-tag">Delete</ButtonRaised>
        <ButtonRaised @click.prevent="() => (isRemoveOpen = false)"> Cancel
        </ButtonRaised>
      </div>
    </FormLayout>
  </ModalDefault>
</nav></template>
