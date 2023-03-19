<script setup lang="ts">
import TableCell from '@/components/TableCell.vue'
import TableLayout from '@/components/TableLayout.vue'
import TableHeader from '@/components/TableHeader.vue'
import TableRow from '@/components/TableRow.vue'
import HomeHeader from '@/components/HomeHeader.vue'
import TablePagination from '@/components/TablePagination.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { LanguageConfiguration } from '@/types/LanguageConfiguration'
import { ref } from 'vue'
import ButtonDefault from '@/components/ButtonDefault.vue'
import ModalDefault from '@/components/ModalDefault.vue'
import HomeFormCreateBusiness from '@/components/HomeFormCreateBusiness.vue'
import type { BusinessInfoOutput } from '@/types/BusinessInfoOutput'

const columnHeadersBusiness = ['Id', 'Name', 'Language', 'Created at']

const businessOutputExample: BusinessInfoOutput[] = [
  {
    name: 'Business 1',
    language_configuration: 'english',
    business_id: 10,
    created_at: '10 mar 2023'
  },
  {
    name: 'Business 1',
    language_configuration: 'english',
    business_id: 10,
    created_at: '10 mar 2023'
  },
  {
    name: 'Business 1',
    language_configuration: 'english',
    business_id: 10,
    created_at: '10 mar 2023'
  }
]

const isOpenCreateModal = ref(false)

const create = () => {
  console.log(name.value, language_configuration.value)
  modalClose()
}

const modalOpen = () => {
  name.value = ''
  isOpenCreateModal.value = true
}

const modalClose = () => {
  isOpenCreateModal.value = false
}

const name = ref<string>('')
const language_configuration = ref<LanguageConfiguration>('english')
</script>

<template>
  <HomeHeader>
    <div class="flex items-center gap-6">
      <h1 class="text-xl font-semibold text-ctp-subtext0">Businesses List</h1>
      <ButtonDefault @click="modalOpen">
        <FontAwesomeIcon :icon="['fas', 'plus']" class="mr-1" />
        Create new
      </ButtonDefault>
    </div>
    <TablePagination :total="10" />
  </HomeHeader>
  <main>
    <TableLayout>
      <template v-slot:header>
        <TableHeader v-for="(name, index) of columnHeadersBusiness" :key="index">
          {{ name }}
        </TableHeader>
        <TableHeader class="w-8" />
      </template>
      <template v-slot:body>
        <TableRow v-for="(business, index) of businessOutputExample" :key="index">
          <TableCell>
            {{ business.business_id }}
          </TableCell>
          <TableCell>
            <RouterLink
              :to="{ path: `/business/${business.business_id}/article` }"
              class="underline transition duration-100 hover:text-ctp-rosewater"
            >
              {{ business.name }}
            </RouterLink>
          </TableCell>
          <TableCell>
            {{ business.language_configuration }}
          </TableCell>
          <TableCell>
            {{ business.created_at }}
          </TableCell>
          <TableCell>
            <button class="px-2 transition duration-100 hover:text-ctp-maroon">
              <FontAwesomeIcon :icon="['fas', 'trash']" />
            </button>
          </TableCell>
        </TableRow>
      </template>
    </TableLayout>
  </main>

  <!-- Create new modal -->
  <ModalDefault :is-open="isOpenCreateModal" modal-class="w-96 -ml-48" @close="modalClose">
    <h2 class="mb-4 text-xl font-semibold text-ctp-subtext0">Create new business</h2>
    <HomeFormCreateBusiness
      v-model:business-name="name"
      v-model:language_configuration="language_configuration"
      form-id="form-business-create"
    />
    <div class="mt-8 flex justify-end gap-4">
      <ButtonDefault @click.prevent="create" form="form-business-create">Create</ButtonDefault>
      <ButtonDefault @click="modalClose">Cancel</ButtonDefault>
    </div>
  </ModalDefault>
</template>
