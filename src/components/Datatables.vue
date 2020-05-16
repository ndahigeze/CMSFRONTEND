<template>
  <div>
    <DataTables
      :data="data"
      :filters="filters"
      @selection-change="handleSelectionChange"
      :pagination-props="{background: true, pageSizes: pageSizes || [5,10,25,50] }"
    >
      <el-table-column type="selection" v-if="selection" width="55"></el-table-column>
      <el-table-column
        v-for="title in titles"
        :prop="title.prop"
        :label="title.label"
        :key="title.prop"
        sortable="custom"
        :formatter="title.formatter"
      ></el-table-column>
      <el-table-column label="Actions" v-if="actionCol" min-width="100px">
        <template slot-scope="scope">
          <button
            type="button"
            :key="button.id"
            :class="button.renderFn?(button.renderFn(scope.row)?''+button.classes:'d-none '+button.classes):button.classes"
            @click="$emit(button.event,scope.row)"
            v-for="button in actionCol.buttons"
            data-toggle="tooltip"
            :data-placement="button.tooltip.placement || 'top'"
            :title="button.tooltip.title || ''"
          >
            <i :class="button.icon"></i>
            {{button.label}}
          </button>
        </template>
      </el-table-column>
    </DataTables>
  </div>
</template>

<script>
export default {
  name:'datattable',
  props: ["selection", "data", "titles", "actionCol", "filters", "pageSizes"],
  methods: {
    handleSelectionChange(val) {
      this.$emit("selection", val);
    }
  }
};
</script>