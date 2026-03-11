export enum ESort {
    DEFAULT = -1,
    DATE,
    COST,
    PRIORITY
}

export const SORT_META: Record<
    ESort,
    { title: string }
> = {
    [ESort.DEFAULT]: { title: "Сортировать по..." },
    [ESort.DATE]: { title: "По дате" },
    [ESort.COST]: { title: "По цене" },
    [ESort.PRIORITY]: { title: "По приоритету" },
};

export enum ECategory {
    DEFAULT = -1,
    GIFT = 0,
    AUTO = 1,
    PETS = 2,
    HOBBY = 3
}

export const CATEGORY_META: Record<
    ECategory,
    { title: string }
> = {
    [ECategory.DEFAULT]: { title: "Категория..." },
    [ECategory.GIFT]: { title: "Бесплатно" },
    [ECategory.AUTO]: { title: "Автомобили" },
    [ECategory.PETS]: { title: "Домашние животные" },
    [ECategory.HOBBY]: { title: "Хобби" },
};

export enum EPriority {
    HIGH,
    USUAL
}

// TODO: названия
export const PRIORITY_META: Record<
    EPriority,
    { title: string }
> = {
    [EPriority.HIGH]: { title: "Срочный" },
    [EPriority.USUAL]: { title: "Обычный" }
}

export enum EStatus {
    INPROCESS,
    ACCEPTED,
    DECLINED,
    DRAFT
}

// TODO
export const STATUS_META: Record<
    EStatus,
    { title: string, server: string }
> = {
    [EStatus.ACCEPTED]: { title: "Одобрена", server:"" },
    [EStatus.INPROCESS]: { title: "На модерации", server:"" },
    [EStatus.DRAFT]: { title: "Возвращена", server:"" },
    [EStatus.DECLINED]: { title: "Отклонена", server:"" },
};