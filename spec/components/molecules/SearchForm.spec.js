// Components
import SearchForm from "@/components/molecules/SearchForm.vue";

// Utilities
import { mount } from "@vue/test-utils";

describe("SearchForm", () => {
  describe("Button", () => {
    it("is valid if loading is false", () => {
      // loadingをfalseに
      const props = {
        loading: false
      };
      const wrapper = mount(SearchForm, {
        propsData: props
      });

      // loadingがfalseであるか
      expect(wrapper.props("loading")).toBe(false);

      // v-btnが有効であるか
      const button = wrapper.find(".v-btn");
      button.trigger("click");
      expect(button.emitted().click.length).toBe(1);
    });

    it("is invalid if loading is true", () => {
      // loadingをtrueに
      const props = {
        loading: true
      };
      const wrapper = mount(SearchForm, {
        propsData: props
      });

      // loadingがtrueであるか
      expect(wrapper.props("loading")).toBe(true);

      // v-btnが無効であるか
      const button = wrapper.find(".v-btn");
      expect(button.attributes().disabled).toBe("disabled");
    });

    describe("clicked", () => {
      it("when searchWord is empty", () => {
        // loadingをfalseに
        const props = {
          loading: false
        };
        const wrapper = mount(SearchForm, {
          propsData: props
        });

        // v-btnをクリック
        const button = wrapper.find(".v-btn");
        button.trigger("click");

        // イベントは発行されない
        expect(wrapper.emitted().handleSearch).toBeFalsy();
      });

      it("when searchWord is full", () => {
        // loadingをfalseに
        const props = {
          loading: false
        };
        const wrapper = mount(SearchForm, {
          propsData: props
        });

        // searchWordにデータをセット
        wrapper.setData({ searchWord: "JavaScript" });

        // v-btnをクリック
        const button = wrapper.find(".v-btn");
        button.trigger("click");

        // イベントが発行されたか
        expect(wrapper.emitted().handleSearch).toBeTruthy();

        // イベントの数を検証
        expect(wrapper.emitted().handleSearch.length).toBe(1);

        // イベントのペイロードを検証
        expect(wrapper.emitted().handleSearch[0][0]).toBe("JavaScript");
      });
    });
  });

  describe("message", () => {
    // メッセージが空のとき
    it("is empty", () => {
      const wrapper = mount(SearchForm, {
        propsData: {
          loading: false,
          message: ""
        }
      });

      expect(wrapper.vm.message).toBe("");
    });

    // メッセージがあるとき
    it("is full", () => {
      const wrapper = mount(SearchForm, {
        propsData: {
          loading: false,
          message: "Not Found"
        }
      });

      expect(wrapper.vm.message).toBe("Not Found");
    });
  });
});
