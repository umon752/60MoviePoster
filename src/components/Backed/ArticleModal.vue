<template>
  <div
    ref="modal"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog modal-dialog-centered modal-fullscreen-lg-down modal-xl
      "
    >
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title title fs-2" id="exampleModalLabel">
            {{ modalTitle }} ARTICLE
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Form v-slot="{ errors }" class="row mb-4" ref="form">
            <div class="col-md-6">
              <div class="row">
                <div class="col-12 mb-5">
                  <label for="title" class="form-label text-secondary">
                    <span class="text-primary">*</span>TITLE</label
                  >
                  <Field
                    type="text"
                    class="form-control"
                    id="title"
                    name="Title"
                    placeholder="Please enter a title"
                    :class="{ 'is-invalid': errors['Title'] }"
                    rules="required"
                    v-model.trim="tempArticle.title"
                  />
                  <error-message
                    name="Title"
                    class="invalid-feedback"
                  ></error-message>
                </div>
                <div class="col-md-6 mb-5">
                  <label for="author" class="form-label text-secondary">
                    <span class="text-primary">*</span>AUTHOR</label
                  >
                  <Field
                    type="text"
                    class="form-control"
                    id="author"
                    name="Author"
                    placeholder="Please enter a author"
                    :class="{ 'is-invalid': errors['Author'] }"
                    rules="required"
                    v-model.trim="tempArticle.author"
                  />
                  <error-message
                    name="Author"
                    class="invalid-feedback"
                  ></error-message>
                </div>
                <div class="col-md-6 mb-5">
                  <label for="date" class="form-label text-secondary">
                    <span class="text-primary">*</span>CREATE DATE</label
                  >
                  <input
                    type="date"
                    class="form-control text-secondary"
                    id="date"
                    :min="today"
                    v-model="create_at"
                  />
                </div>
                <div class="col-12 mb-5">
                  <label for="description" class="form-label text-secondary"
                    >DESCRIPTION</label
                  >
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="Please enter a description"
                    v-model.trim="tempArticle.description"
                  >
                  </textarea>
                </div>
                <div class="col mb-5 mb-md-0">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="isPublic"
                      :true-value="true"
                      :false-value="false"
                      v-model="tempArticle.isPublic"
                    />
                    <label class="form-check-label" for="isPublic">
                      IS PUBLIC
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label for="tag" class="form-label text-secondary">TAG</label>
              <div class="row align-items-center mb-2">
                <div
                  class="col-6 col-xl-4 mb-3"
                  v-for="(item, index) in tempArticle.tag"
                  :key="index"
                >
                  <div class="position-relative">
                    <input
                      type="text"
                      id="tag"
                      class="form-control rounded-pill pe-7"
                      placeholder="Please enter a tag"
                      v-model.trim="tempArticle.tag[index]"
                    />
                    <a
                      href="#"
                      class="link d-flex align-items-center"
                      @click.prevent="delTag(index)"
                    >
                      <span
                        class="
                          position-absolute
                          top-50
                          end-0
                          translate-middle
                          material-icons
                          opacity-50
                        "
                        >clear
                      </span>
                    </a>
                  </div>
                </div>
                <div class="col-6 col-xl-4 mb-3">
                  <button
                    type="button"
                    class="
                      btn btn-outline-primary
                      rounded-pill
                      w-100
                      d-flex
                      align-items-center
                      justify-content-center
                      py-1
                    "
                    v-if="tempArticle.tag"
                    @click="addTag"
                    :class="{
                      disabled:
                        tempArticle.tag[tempArticle.tag.length - 1] === '',
                    }"
                  >
                    <span class="material-icons me-1"> add </span>
                    ADD TAG
                  </button>
                </div>
              </div>

              <p class="text-secondary mb-2">
                <span class="text-primary">*</span>CONTENT
              </p>
              <ckeditor
                :editor="editor"
                v-model="tempArticle.content"
                :config="editorConfig"
              ></ckeditor>
            </div>
          </Form>
        </div>
        <div class="modal-footer justify-content-end">
          <button
            type="button"
            class="btn btn-sm btn-secondary text-white"
            data-bs-dismiss="modal"
          >
            CANCLE
          </button>
          <button
            type="button"
            class="btn btn-sm btn-primary"
            @click="$emit('updateArticle', tempArticle, modalTitle)"
          >
            <Spinner v-if="isSpinner" />OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modal';
import Spinner from '@/components/Spinner.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: {
    modalTitle: {
      type: String,
      default() {
        return '';
      },
    },
    articleData: {
      type: Object,
      default() {
        return {};
      },
    },
    isSpinner: {
      type: Boolean,
    },
  },
  mixins: [modalMixin],
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link'],
      },
      tempArticle: {},
      create_at: '',
      today: '',
    };
  },
  watch: {
    articleData() {
      this.tempArticle = JSON.parse(JSON.stringify(this.articleData));
      // 將從外層取得的時間資料，格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempArticle.create_at * 1000).toISOString().split('T');
      // 解構賦值（Destructuring Assignment）
      [this.create_at, this.test] = dateAndTime;
    },
    create_at() {
      // 將內層設定的時間資料，格式改回 timestamp (時間戳)
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
  methods: {
    resetForm() {
      // 這裡 reset 是避免暫存已被刪除的資料 (暫存已被刪除的資料開啟同一筆會無法顯示)
      this.tempArticle = {
        title: '',
        author: '',
        description: '',
        content: '',
        tag: [''],
        isPublic: false,
      };
      this.tempArticle.create_at = new Date().getTime() / 1000;
      const dateAndTime = new Date(this.tempArticle.create_at * 1000).toISOString().split('T');
      [this.create_at, this.test] = dateAndTime;
      // 設定最小值 (今天日期)，格式 YYYY-MM-DD
      this.today = Math.floor(Date.now() / 1000);
      [this.today] = dateAndTime;
      // 利用非同步處理立即觸發 veevalidate 的問題
      setTimeout(() => this.$refs.form.resetForm(), 0);
    },
    delTag(index) {
      if (this.tempArticle.tag.length > 1) {
        this.tempArticle.tag.splice(index, 1);
      }
      if (this.tempArticle.tag[index] !== '') {
        this.tempArticle.tag[index] = '';
      }
    },
    addTag() {
      if (this.tempArticle.tag[this.tempArticle.tag.length - 1] !== '') {
        this.tempArticle.tag.push('');
      }
    },
  },
  components: {
    Spinner,
  },
};
</script>
