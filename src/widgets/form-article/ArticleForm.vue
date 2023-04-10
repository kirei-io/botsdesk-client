<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { marked } from 'marked'
import TurndownService from 'turndown'
import { computed, watch } from 'vue'

import { useArticleStore, useTagStore } from '@/entities/customer'
import { ButtonFlat, CardLayout, FormLayout, InputText } from '@/shared/ui'

import ButtonEditor from './ui/ButtonEditor.vue'

const props = defineProps<{ formName: string }>()

const store = useArticleStore()
const tag = useTagStore()


const keydown = () => {
  if (store.error) {
    store.onErrorReset()
  }
}

const html = computed(() => marked.parse(store.newAnswer))

const editor = useEditor({
  content: `${html.value}`,
  extensions: [
    StarterKit.configure({
      bulletList: {
        HTMLAttributes: {
          class: 'list-disc pl-8'
        }
      },
      orderedList: {
        HTMLAttributes: {
          class: 'list-decimal pl-8'
        }
      },
      code: {
        HTMLAttributes: {
          class: 'p-2 bg-ctp-crust rounded leading-loose'
        }
      },
      heading: {
        HTMLAttributes: {
          class: 'editor-heading leading-loose'
        },
        levels: [1, 2]
      },
      horizontalRule: {
        HTMLAttributes: {
          class: 'border-solid border-ctp-surface1'
        }
      },
      blockquote: {
        HTMLAttributes: {
          class: 'p-2 bg-ctp-surface0 rounded my-2 text-ctp-subtext0'
        }
      }
    })
  ],
  editorProps: {
    attributes: {
      class:
        'w-full min-h-[16rem] rounded-md bg-ctp-mantle px-4 py-4 outline-none drop-shadow transition-colors duration-300 ease-in-out'
    }
  },
  onUpdate() {
    if (editor.value) {
      store.newAnswer = md.value
    }
  }
})

watch(store, () => {
  if (store.newAnswer === md.value) {
    return
  }
  editor.value?.commands.setContent(html.value)
})

const serv = new TurndownService()

const md = computed(() => serv.turndown(editor.value?.getHTML() ?? ''))

const selectTag = (tag_id?: string) => {
  if (tag_id) {
    if (store.selectedTags.has(tag_id)) {
      store.selectedTags.delete(tag_id)
    } else {
      store.selectedTags.add(tag_id)
    }
  } else {
    store.selectedTags.clear()
  }
}

const isSelectedTag = (tag_id: string) => {
  return store.selectedTags.has(tag_id)
}
</script>

<template>
  <div>
    <div class="my-2 h-4 px-4 text-xs font-semibold text-ctp-maroon">
      <span v-show="store.error">
        {{ store.error?.message }}
      </span>
    </div>
    <FormLayout
      :id="props.formName"
      @keydown="keydown"
    >
      <InputText
        v-model:value="store.newQuestion"
        name="question"
        class="mb-8"
        placeholder="Enter your question"
        label="Question"
      />

      <div>
        <div class="mb-2 px-4 text-sm font-semibold text-ctp-subtext0">Tags</div>
        <CardLayout class="mb-8">
          <div
            v-if="tag.listTags && tag.listTags.total > 0"
            class="flex flex-wrap gap-4"
          >
            <ButtonFlat
              v-for="(tagItem, index) of tag.listTags?.items"
              :key="index"
              :class="{
                'bg-ctp-crust': isSelectedTag(String(tagItem.tag_id)),
                'hover:bg-ctp-base': isSelectedTag(String(tagItem.tag_id))
              }"
              @click.prevent="() => selectTag(String(tagItem.tag_id))"
            >
              {{ tagItem.name }}
            </ButtonFlat>
          </div>
          <div
            v-else
            class="font-semibold text-ctp-overlay1"
          >No tags</div>
        </CardLayout>
      </div>
      <div v-if="editor">
        <CardLayout class="mb-4 flex gap-2 !px-4 !py-2">
          <ButtonEditor
            :is-active="false"
            @click.prevent="() => editor?.commands.undo()"
          >
            <FontAwesomeIcon
              :icon="['fas', 'arrow-turn-right']"
              flip="horizontal"
            />
          </ButtonEditor>
          <ButtonEditor
            :is-active="false"
            @click.prevent="() => editor?.commands.redo()"
          >
            <FontAwesomeIcon :icon="['fas', 'arrow-turn-right']" />
          </ButtonEditor>
          <ButtonEditor
            :is-active="editor.isActive('bold')"
            @click.prevent="() => editor?.chain().focus().toggleBold().run()"
          >
            <FontAwesomeIcon :icon="['fas', 'bold']" />
          </ButtonEditor>
          <ButtonEditor
            :is-active="editor.isActive('italic')"
            @click.prevent="() => editor?.chain().focus().toggleItalic().run()"
          >
            <FontAwesomeIcon :icon="['fas', 'italic']" />
          </ButtonEditor>
          <ButtonEditor
            :is-active="editor.isActive('code')"
            @click.prevent="() => editor?.chain().focus().toggleCode().run()"
          >
            <FontAwesomeIcon :icon="['fas', 'code']" />
          </ButtonEditor>
          <ButtonEditor
            :is-active="editor.isActive('heading', { level: 1 })"
            @click.prevent="() => editor?.chain().focus().toggleHeading({ level: 1 }).run()"
          >
            <FontAwesomeIcon :icon="['fas', 'heading']" />
            <FontAwesomeIcon :icon="['fas', '1']" />
          </ButtonEditor>
          <ButtonEditor
            :is-active="editor.isActive('heading', { level: 2 })"
            @click.prevent="() => editor?.chain().focus().toggleHeading({ level: 2 }).run()"
          >
            <FontAwesomeIcon :icon="['fas', 'heading']" />
            <FontAwesomeIcon :icon="['fas', '2']" />
          </ButtonEditor>
          <ButtonEditor
            :is-active="editor.isActive('bulletList')"
            @click.prevent="() => editor?.chain().focus().toggleBulletList().run()"
          >
            <FontAwesomeIcon :icon="['fas', 'list-ul']" />
          </ButtonEditor>
          <ButtonEditor
            :is-active="editor.isActive('orderedList')"
            @click.prevent="() => editor?.chain().focus().toggleOrderedList().run()"
          >
            <FontAwesomeIcon :icon="['fas', 'list-ol']" />
          </ButtonEditor>

          <ButtonEditor
            :is-active="editor.isActive('blockquote')"
            @click.prevent="() => editor?.chain().focus().toggleBlockquote().run()"
          >
            <FontAwesomeIcon :icon="['fas', 'quote-right']" />
          </ButtonEditor>
          <ButtonEditor
            :is-active="false"
            @click.prevent="() => editor?.chain().focus().setHorizontalRule().run()"
          >
            <FontAwesomeIcon :icon="['fas', 'minus']" />
          </ButtonEditor>
        </CardLayout>
        <EditorContent :editor="editor" />
      </div>
    </FormLayout>
  </div>
</template>

<style>
h1.editor-heading {
  font-size: 2rem;
}

h2.editor-heading {
  font-size: 1.5rem;
}
</style>
