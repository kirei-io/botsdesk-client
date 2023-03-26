<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { onBeforeUnmount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useArticleStore } from '@/entities/customer';
import { ROUTE_NAME } from '@/shared/config';
import { ButtonRaised, CardLayout, RouteButtonRaised } from '@/shared/ui';
import { HeaderArticle } from '@/widgets/header-article';

const route = useRoute()
const router = useRouter()
const store = useArticleStore()

const deleteArticle = () => {
  store.onDeleteAtrticle(String(route.params.business_id), String(route.params.id))
  router.push({
    name: ROUTE_NAME.ARTICLE_LIST,
    params: {
      business_id: route.params.business_id
    }
  })
}

onMounted(async () => {
  store.onArticle(String(route.params.business_id), String(route.params.id))
})

onBeforeUnmount(() => {
  store.$reset()
})

</script>

<template>
  <main>
    <HeaderArticle>
      <RouteButtonRaised
        :to="{ name: ROUTE_NAME.ARTICLE_EDIT, params: route.params }"
      >
        <FontAwesomeIcon
          :icon="['fas', 'pen']"
          class="text-xs mr-2"
        />
        Edit
      </RouteButtonRaised>
      <ButtonRaised
        @click="deleteArticle"
        v-show="false"
      >
        Delte
      </ButtonRaised>
    </HeaderArticle>
    <CardLayout class="!mt-10">
      <p>
        {{ store.answer ?? '' }}
      </p>
    </CardLayout>
  </main>
</template>
