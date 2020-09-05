module.exports = {
    description: 'Add a empty view',
    prompts: [
        {
            type: 'input',
            name: 'viewName',
            message: 'View\'s name please'
        },
        {
            type: 'input',
            name: 'viewPath',
            message: 'View\'s path please'
        }
    ],
    actions(data) {
        const { viewPath } = data;
        if (viewPath) {
            return [
                {
                    type: 'add',
                    path: 'src/views/{{viewPath}}/{{viewName}}/{{viewName}}.vue',
                    templateFile: 'plop-templates/empty.view/vue.hbs'
                },
                {
                    type: 'add',
                    path: 'src/views/{{viewPath}}/{{viewName}}/{{viewName}}.js',
                    templateFile: 'plop-templates/empty.view/js.hbs'
                },
                {
                    type: 'add',
                    path: 'src/views/{{viewPath}}/{{viewName}}/{{viewName}}.scss',
                    templateFile: 'plop-templates/empty.view/scss.hbs'
                }
            ];
        }
        return [
            {
                type: 'add',
                path: 'src/views/{{viewName}}/{{viewName}}.vue',
                templateFile: 'plop-templates/empty.view/vue.hbs'
            },
            {
                type: 'add',
                path: 'src/views/{{viewName}}/{{viewName}}.js',
                templateFile: 'plop-templates/empty.view/js.hbs'
            },
            {
                type: 'add',
                path: 'src/views/{{viewName}}/{{viewName}}.scss',
                templateFile: 'plop-templates/empty.view/scss.hbs'
            }
        ];
    }
};
